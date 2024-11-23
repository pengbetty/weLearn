//contract model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Contract = sequelize.define(
  'Contract',
  {
    ContractID: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
    },
    UserID: { type: DataTypes.SMALLINT, allowNull: true },
    StartDate: { type: DataTypes.DATE, allowNull: true },
    FinishDate: { type: DataTypes.DATE, allowNull: true },
    Amount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
  },
  {
    tableName: 'Contract',
    timestamps: false,
  }
);

module.exports = Contract;












