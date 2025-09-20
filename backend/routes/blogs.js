import express from "express";
import multer from "multer";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  listBlogs,
  getBlogById,
  getUnseenBlogs,
  markViewed,
  getUnseenBlogCount,
} from "../controllers/blogController.js";

import { authenticateToken, adminOnly, userOnly } from "../middlewares/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Admin routes
router.get("/", authenticateToken, adminOnly, listBlogs);
router.post("/", authenticateToken, adminOnly, upload.single("image"), createBlog);
router.put("/:id", authenticateToken, adminOnly, upload.single("image"), updateBlog);
router.delete("/:id", authenticateToken, adminOnly, deleteBlog);

// User routes
router.get("/unseen", authenticateToken, userOnly, getUnseenBlogs);
router.post("/:id/mark-viewed", authenticateToken, userOnly, markViewed);
router.get("/unseen-count", authenticateToken, userOnly, getUnseenBlogCount);

router.get("/:id", authenticateToken, getBlogById);

export default router;
