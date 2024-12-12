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
    programLength: { type: DataTypes.STRING(50) },
    programLevel: { type: DataTypes.STRING(50) },
    programLink: { type: DataTypes.STRING(100) },
    appDeadline: { type: DataTypes.DATE },
    programRanking: { type: DataTypes.INTEGER },
  },
  {
    tableName: "program",
    timestamps: false,
  }
);

module.exports = Program;
