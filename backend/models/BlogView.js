import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const BlogView = sequelize.define(
  "BlogView",
  {
    user_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    blog_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    viewed: { type: DataTypes.BOOLEAN, defaultValue: false },
    viewed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "blogviews",
    timestamps: true,
  }
);

export default BlogView;
