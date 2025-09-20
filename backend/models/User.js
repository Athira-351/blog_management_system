import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role_id: { type: DataTypes.INTEGER }
}, {
  tableName: "users",
  timestamps: true
});

export default User;
