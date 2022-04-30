const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userscheme = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    aadharNumber: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    vaccine: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("user", userscheme);
