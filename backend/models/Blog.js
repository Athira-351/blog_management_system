import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Blog = sequelize.define("Blog", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING },
});

export default Blog;
