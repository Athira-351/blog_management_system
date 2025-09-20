import sequelize from "../config/db.js";
import User from "./User.js";
import Role from "./Role.js";
import Blog from "./Blog.js";
import BlogView from "./BlogView.js";

// User-Role
Role.hasMany(User, { foreignKey: "role_id" });
User.belongsTo(Role, { foreignKey: "role_id", as: "Role" });

// User-Blog
User.belongsToMany(Blog, { through: BlogView, foreignKey: "user_id", otherKey: "blog_id" });
Blog.belongsToMany(User, { through: BlogView, foreignKey: "blog_id", otherKey: "user_id" });

// for direct access
BlogView.belongsTo(User, { foreignKey: "user_id" });
BlogView.belongsTo(Blog, { foreignKey: "blog_id" });

export { sequelize, User, Role, Blog, BlogView };