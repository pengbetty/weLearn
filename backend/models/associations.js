const Program = require("./Program");
const College = require("./College");
const User = require("./User");
const Contract = require("./Contract");

const defineAssociations = () => {
  College.hasMany(Program, { foreignKey: "ColID" });
  Program.belongsTo(College, { foreignKey: "ColID" });
  User.hasMany(Contract, { foreignKey: "UserID" });
  Contract.belongsTo(User, { foreignKey: "UserID" });
};

module.exports = defineAssociations;
