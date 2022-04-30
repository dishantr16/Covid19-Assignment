const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); 
// app.use(express.urlencoded({ extended: true }));  
const {config} = require("./app/config/db");
// Covid-19 routes
require('../Saleshandy/app/routes/covidRoutes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});