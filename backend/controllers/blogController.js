import Blog from "../models/Blog.js";
import BlogView from "../models/BlogView.js";
import { Op } from "sequelize";

// Admin: List all blogs
export const listBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [["createdAt", "DESC"]] });
    res.json(blogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin: Create blog
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.path : null;

    const blog = await Blog.create({ title, content, image });
    res.json(blog);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(400).json({ error: err.message });
  }
};

// Admin: Update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const imagePath = req.file ? req.file.path : undefined;

    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.update({ title, content, ...(imagePath && { imagePath }) });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Admin: Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.destroy({ where: { id } });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// User: Fetch unseen blogs
export const getUnseenBlogs = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get blog IDs that user has already viewed
    const viewed = await BlogView.findAll({ where: { user_id: userId } });
    const viewedIds = viewed.map((v) => v.blog_id);

    // Fetch blogs that user has NOT viewed
    const blogs = await Blog.findAll({
      where: viewedIds.length > 0 ? { id: { [Op.notIn]: viewedIds } } : {},
      order: [["createdAt", "DESC"]],
    });

    res.json(blogs);
  } catch (err) {
    console.error("Error fetching unseen blogs:", err);
    res.status(500).json({ error: err.message });
  }
};

//  Mark blog as viewed
export const markViewed = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    const blogId = parseInt(req.params.id, 10);
    if (isNaN(blogId)) return res.status(400).json({ error: "Invalid blog ID" });

    // Check if blog exists
    const blog = await Blog.findByPk(blogId);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    await BlogView.findOrCreate({
      where: { user_id: userId, blog_id: blogId },
      defaults: { viewed: true, viewed_at: new Date() },
    });

    res.json({ message: "Blog marked as viewed" });
  } catch (err) {
    console.error("Error marking blog as viewed:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get single blog
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// unseen count
export const getUnseenBlogCount = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all blog IDs that the user has already seen
    const viewed = await BlogView.findAll({ where: { user_id: userId } });
    const viewedIds = viewed.map(v => v.blog_id);

    // Count blogs that the user has not seen
    const unseenCount = await Blog.count({
      where: viewedIds.length ? { id: { [Op.notIn]: viewedIds } } : {}
    });

    res.json({ unseenCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};