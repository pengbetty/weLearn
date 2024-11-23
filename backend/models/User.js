//user model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING(10), allowNull: false },
    displayname: { type: DataTypes.STRING(50), allowNull: false },
    password: { type: DataTypes.STRING(32), allowNull: false },
    email: { type: DataTypes.STRING(32), allowNull: true },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

module.exports = User;
