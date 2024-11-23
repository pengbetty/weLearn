const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const College = sequelize.define('College', {
  ID: { type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true },
  USRanking: { type: DataTypes.SMALLINT },
  Name: { type: DataTypes.STRING(100), allowNull: false },
  City: { type: DataTypes.STRING(50) },
  State: { type: DataTypes.STRING(50) },
  Country: { type: DataTypes.STRING(50) },
  Link: { type: DataTypes.STRING(100) },
  UGNumber: { type: DataTypes.SMALLINT },
  PGNumber: { type: DataTypes.SMALLINT },
  RMK: { type: DataTypes.TEXT },
  Environment: { type: DataTypes.ENUM('Rural', 'Urban', 'Suburb') },
  QSRanking: { type: DataTypes.SMALLINT }
}, {
  tableName: 'College',
  timestamps: false
});

module.exports = College;