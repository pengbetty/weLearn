const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const School = sequelize.define(
  "School",
  {
    schID: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
    },
    schName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    schCity: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    schState: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    schCountry: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    schPostcode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: "school",
    timestamps: false,
  }
);

module.exports = School;
