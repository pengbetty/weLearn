const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Student = sequelize.define('Student', {
  StuID: { type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true },
  StuCategory: { type: DataTypes.ENUM('A', 'B', 'C', 'NA') },
  StuCurrentSchID: { type: DataTypes.SMALLINT },
  Stu1stName: { type: DataTypes.STRING(10), allowNull: false },
  StuMidName: { type: DataTypes.STRING(10) },
  StuLastName: { type: DataTypes.STRING(10), allowNull: false },
  StuPrefName: { type: DataTypes.STRING(10) },
  StuComments: { type: DataTypes.TEXT },
  StuDOB: { type: DataTypes.DATE },
  StuGender: { type: DataTypes.STRING(5) },
  StuPhone: { type: DataTypes.STRING(15), unique: true },
  StuEmail: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  AppLevel: { type: DataTypes.ENUM('UG', 'G', 'PG', 'PhD', 'HS', 'S', 'AS', 'C', 'O') },
  AppCountry: { type: DataTypes.ENUM('US', 'GB', 'CA', 'AU') },
  StuGPA: { type: DataTypes.DECIMAL(3, 2) },
  StuStreet: { type: DataTypes.STRING(100) },
  StuCity: { type: DataTypes.STRING(50) },
  StuState: { type: DataTypes.STRING(50) },
  StuPostcode: { type: DataTypes.STRING(10) },
  StuGradSchID: { type: DataTypes.SMALLINT },
}, {
  tableName: 'Student',
  timestamps: false,
});

module.exports = Student;