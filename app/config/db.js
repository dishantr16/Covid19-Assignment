const express = require("express");
const app = express();
const mongoose = require("mongoose");
module.exports = mongoose
  .connect(
    "mongodb+srv://admin:admin@learning-prod.pyzlo.mongodb.net/Covid?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.warn("DB CONNECTION DONE");
  });
