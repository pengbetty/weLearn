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
    usRanking: { type: DataTypes.SMALLINT },
    collegeName: { type: DataTypes.STRING(100), allowNull: false },
    city: { type: DataTypes.STRING(50) },
    state: { type: DataTypes.STRING(50) },
    country: { type: DataTypes.STRING(50) },
    link: { type: DataTypes.STRING(100) },
    ugNumber: { type: DataTypes.SMALLINT },
    pgNumber: { type: DataTypes.SMALLINT },
    rmk: { type: DataTypes.TEXT },
    environment: { type: DataTypes.ENUM("Rural", "Urban", "Suburb") },
    qsRanking: { type: DataTypes.SMALLINT },
  },
  {
    tableName: "college",
    timestamps: false,
  }
);

module.exports = College;
