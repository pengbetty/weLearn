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

// Middleware
app.use(express.json());

//making a constant for PORT
const PORT = 3000;

//server running on 3000
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})