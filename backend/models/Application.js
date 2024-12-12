const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Application = sequelize.define(
  "application",
  {
    appID: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
    },
    contractID: { type: DataTypes.SMALLINT, allowNull: false },
    stuID: { type: DataTypes.SMALLINT, allowNull: false },
    programID: { type: DataTypes.SMALLINT, allowNull: false },
    appDate: { type: DataTypes.DATE },
    status: {
      type: DataTypes.ENUM(
        "In Progress",
        "Submitted",
        "Assessing",
        "Further Action",
        "Ok",
        "Declined"
      ),
    },
    appComments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    appType: { type: DataTypes.ENUM("Visa", "Offer", "Other") },
    outcomeDate: { type: DataTypes.DATE },
  },

  {
    tableName: "application",
    timestamps: false,
  }
);

module.exports = Application;
