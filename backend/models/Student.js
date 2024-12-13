const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Student = sequelize.define(
  "Student",
  {
    stuID: { type: DataTypes.SMALLINT, autoIncrement: true, primaryKey: true },
    contractID: { type: DataTypes.SMALLINT },
    stuCategory: { type: DataTypes.ENUM("A", "B", "C", "NA") },
    stuCurrentSchID: { type: DataTypes.SMALLINT },
    stu1stName: { type: DataTypes.STRING(10), allowNull: false },
    stuMidName: { type: DataTypes.STRING(20) },
    stuLastName: { type: DataTypes.STRING(20), allowNull: false },
    stuPrefName: { type: DataTypes.STRING(15) },
    stuComments: { type: DataTypes.TEXT },
    stuDOB: { type: DataTypes.DATE },
    stuGender: { type: DataTypes.STRING(5) },
    stuPhone: { type: DataTypes.STRING(15), unique: true },
    StuEmail: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    appLevel: {
      type: DataTypes.ENUM("UG", "G", "PG", "PhD", "HS", "S", "AS", "C", "O"),
    },
    appCountry: { type: DataTypes.ENUM("US", "GB", "CA", "AU") },
    stuGPA: { type: DataTypes.DECIMAL(3, 2) },
    stuStreet: { type: DataTypes.STRING(100) },
    stuCity: { type: DataTypes.STRING(50) },
    stuState: { type: DataTypes.STRING(10) },
    stuPostcode: { type: DataTypes.STRING(10) },
    stuGradSchID: { type: DataTypes.SMALLINT },
  },
  {
    tableName: "student",
    timestamps: false,
  }
);

module.exports = Student;
