const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 8889,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connected to MySQL database via Sequelize"))
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;
