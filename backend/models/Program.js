
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); 

const Program = sequelize.define('Program', {
  PID: { type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true },
  ColID: { type: DataTypes.SMALLINT, allowNull: false },
  PName: { type: DataTypes.STRING(100), allowNull: false },
  PLength: { type: DataTypes.STRING(50) },
  PLevel: { type: DataTypes.STRING(50) },
  Link: { type: DataTypes.STRING(100) },
  AppDeadline: { type: DataTypes.DATE },
  PRanking: { type: DataTypes.INTEGER }
}, {
  tableName: 'Program',
  timestamps: false
});


module.exports = Program;