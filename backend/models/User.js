//user model
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define(
  "user",
  {
    userId: { type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true },
    userName: { type: DataTypes.STRING(10), allowNull: false },
    displayName: { type: DataTypes.STRING(50), allowNull: false },
    password: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(32), allowNull: false },
    role: { type: DataTypes.STRING(10), allowNull: false },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

module.exports = User;
