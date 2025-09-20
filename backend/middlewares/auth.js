import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

// Admin-only middleware
export const adminOnly = (req, res, next) => {
  if (!req.user?.role || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin privileges required." });
  }
  next();
};

// User-only middleware
export const userOnly = (req, res, next) => {
  if (!req.user?.role || req.user.role !== "user") {
    return res.status(403).json({ message: "User privileges required." });
  }
  next();
};
