const express = require("express"); //import express library
const app = express(); // create new instance for the express application
const dotenv = require("dotenv"); // import dotenv
const mongoose = require("mongoose") // imports mongoose library which is useful for interacting with a MongoDb databse
const authRoute = require("./routes/auth") // This module contains definitions for authetication-related functionalities

dotenv.config();

app.use(express.json()) // This middleware function handles requests with JSON data in the requests body.

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err)); // connects to MongoDb database

app.use("/api/auth", authRoute) // any routes defines in the authRoute will be accessed with the /api/auth prefix

app.listen("5000", () => {
  console.log("Backend is running");
}); // Exprss application starts listening for incoming requests at port 5000
