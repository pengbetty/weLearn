const Program = require("./Program");
const College = require("./College");
const User = require("./User");
const Contract = require("./Contract");

const defineAssociations = () => {
  College.hasMany(Program, { foreignKey: "collegeID" });
  Program.belongsTo(College, { foreignKey: "collegeID" });
  User.hasMany(Contract, { foreignKey: "userID" });
  Contract.belongsTo(User, { foreignKey: "userID" });
};

module.exports = defineAssociations;
