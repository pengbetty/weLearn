//contract model
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Contract = sequelize.define(
  "contract",
  {
    contractID: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
    },
    userID: { type: DataTypes.SMALLINT, allowNull: true },
    startDate: { type: DataTypes.DATE, allowNull: false },
    finishDate: { type: DataTypes.DATE, allowNull: false },
    agent: { type: DataTypes.CHAR, allowNull: true },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  },
  {
    tableName: "contract",
    timestamps: false,
  }
);

module.exports = Contract;
