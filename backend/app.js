//importing express
const express = require("express");
const app = express();

//importing dotenv
const dotenv = require("dotenv");
dotenv.config();

//importing cors
const cors = require("cors");
//using cors
app.use(cors());
//using urlencoded as false
app.use(express.urlencoded({ extended: false }));

const defineAssociations = require("./models/associations");
const Program = require("./models/Program");
const College = require("./models/College");

defineAssociations();

app.get("/", (req, res) => {
  res.send("Your app is deployed");
});
// Middleware
app.use(express.json());
const routes = require("./routes/routes");

app.use("/api", routes);

//making a constant for PORT
const PORT = 3000;

//server running on 3000
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
