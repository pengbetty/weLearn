const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const College = sequelize.define(
  "college",
  {
    collegeID: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
    },
    collegeName: { type: DataTypes.STRING(100), allowNull: false },
    city: { type: DataTypes.STRING(50) },
    state: { type: DataTypes.STRING(50) },
    country: { type: DataTypes.STRING(50) },
    ugNumber: { type: DataTypes.SMALLINT },
    pgNumber: { type: DataTypes.SMALLINT },
    collegeLink: { type: DataTypes.STRING(100) },
    environment: { type: DataTypes.ENUM("Rural", "Urban", "Suburb") },
    qsRanking: { type: DataTypes.SMALLINT },
    usRanking: { type: DataTypes.SMALLINT },
  },
  {
    tableName: "college",
    timestamps: false,
  }
);

module.exports = College;
