import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User, Role } from "../models/index.js";

dotenv.config();

export const ensureAdminExists = async () => {
  const [adminRole] = await Role.findOrCreate({ where: { name: "admin" } });

  let admin = await User.findOne({ where: { email: "admin@example.com" } });
  if (!admin) {
    admin = await User.create({
      name: "Admin",
      email: "admin@example.com",
      passwordHash: await bcrypt.hash("admin123", 10),
      role_id: adminRole.id,
    });
    console.log("Admin user created with password: admin123");
  } else {
    console.log("Admin already exists, keeping old password.");
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;

    // Check if email exists
    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const hash = await bcrypt.hash("admin123", 10);
    console.log(hash);
    
    // Find role in DB
    const roleObj = await Role.findOne({ where: { name: role } });
    if (!roleObj) return res.status(400).json({ message: "Invalid role" });

    // Create user
    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
      role_id: roleObj.id,
    });

    res.json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
  where: { email },
  include: { model: Role, as: "Role" },
});

    if (!user) return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: "Invalid password" });

 const token = jwt.sign(
  { id: user.id, role: user.Role.name, name: user.name },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

res.json({ token, role: user.Role.name, name: user.name });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


