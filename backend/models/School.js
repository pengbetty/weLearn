const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); 

const School = sequelize.define('School', {
  SchID: { 
    type: DataTypes.SMALLINT, 
    autoIncrement: true, 
    primaryKey: true 
  },
  SchName: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  },
  SchCity: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  SchState: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  SchCountry: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  SchPostcode: { 
    type: DataTypes.STRING(10), 
    allowNull: false 
  },
}, {
  tableName: 'School',
  timestamps: false
});

module.exports = School;
