const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Program = sequelize.define(
  "program",
  {
    programID: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
    },
    collegeID: { type: DataTypes.SMALLINT, allowNull: false },
    programName: { type: DataTypes.STRING(100), allowNull: false },
    programLength: { type: DataTypes.STRING(50), allowNull: true },
    programLevel: { type: DataTypes.STRING(50), allowNull: true },
    programLink: { type: DataTypes.STRING(200), allowNull: true },
    appDeadline: { type: DataTypes.DATE, allowNull: true },
    programRanking: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    tableName: "program",
    timestamps: false,
  }
);

module.exports = Program;
