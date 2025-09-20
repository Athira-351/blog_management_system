import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blogs.js";
import { ensureAdminExists } from "./controllers/authController.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;
sequelize
  .sync({ alter: false })
  .then(async () => {
    console.log("Database synced");

    await ensureAdminExists();

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error syncing database:", err));
