const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const users = require("../models/users");
const user = require("../models/users");

exports.users = async (req, res) => {
  try {
    const uniqueId = ("" + Math.random()).substring(2, 18);
    const aadharId = `${uniqueId.substring(0, 4)}-${uniqueId.substring(
      4,
      8
    )}-${uniqueId.substring(8, 12)}-${uniqueId.substring(12)}`;

    const existingUserCount = await user.countDocuments({
      aadharNumber: aadharId,
    });

    if (existingUserCount > 0) {
      return res.status(400).send({
        success: false,
        message: "Aadhar Number is Already Exist",
        data: null,
      });
    }

    // const ip = require("ip");
    // console.dir(ip.address());

    const ip =
      Math.floor(Math.random() * 255) +
      1 +
      "." +
      Math.floor(Math.random() * 255) +
      "." +
      Math.floor(Math.random() * 255) +
      "." +
      Math.floor(Math.random() * 255);

    const newUser = new user({
      _id: new mongoose.Types.ObjectId(),
      aadharNumber: aadharId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      ipAddress: ip,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      vaccine: req.body.vaccine,
    });

    newUser.save().then((result) => {
      res.status(200).send({
        success: true,
        message: "Record inserted",
        data: result,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Required Fileds Are Not Valid",
      data: error,
    });
  }
};

exports.vaccineFilter = async (req, res) => {
  function vaccineFilterData(dateWiseFilter, counts) {
    if (dateWiseFilter.length > 0) {
      res.status(200).send({
        success: true,
        message: "Data Found",
        total: counts,
        data: dateWiseFilter,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Data Not Found",
        total: counts,
        data: [],
      });
    }
  }
  try {
    let type = req.body.vaccineData;
    let currentDate = new Date();
    let Yesterday = currentDate.setDate(currentDate.getDate() - 1);
    let lastWeek = currentDate.setDate(currentDate.getDate() - 7);
    let lastMonth = currentDate.setMonth(currentDate.getMonth() - 1);
    let lastYear = currentDate.setFullYear(currentDate.getFullYear() - 1);
    if (type == "today") {
      const filterData = await user.find({
        endDate: { $gte: new Date(Yesterday) },
      });
      const totalCounts = await user.countDocuments({
        endDate: { $gte: new Date(Yesterday) },
      });
      vaccineFilterData(filterData, totalCounts);
    } else if (type == "week") {
      const filterData = await user.find({
        endDate: { $gte: new Date(lastWeek) },
      });
      const totalCounts = await user.countDocuments({
        endDate: { $gte: new Date(lastWeek) },
      });
      vaccineFilterData(filterData, totalCounts);
    } else if (type == "month") {
      const filterData = await user.find({
        endDate: { $gte: new Date(lastMonth) },
      });
      const totalCounts = await user.countDocuments({
        endDate: { $gte: new Date(lastMonth) },
      });
      vaccineFilterData(filterData, totalCounts);
    } else if (type == "year") {
      const filterData = await user.find({
        endDate: { $gte: new Date(lastYear) },
      });
      const totalCounts = await user.countDocuments({
        endDate: { $gte: new Date(lastYear) },
      });
      vaccineFilterData(filterData, totalCounts);
    } else {
      res.status(400).send({
        message: "Invalid Input",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Required Fileds Are Not Valid",
      data: error,
    });
  }
};

exports.covidLocation = async (req, res) => {
  try {
    let type = req.body.location;

    const filterData = await user.find({ location: type });

    let total = filterData.length;

    if (filterData.length > 0) {
      filterData.push(total);
      res.status(200).send({
        message: "Data Found",
        Total: total,
        data: filterData,
      });
    } else {
      res.status(200).send({
        message: "No Data Found",
        Total: total,
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Required Fileds Are Not Valid",
      data: error,
    });
  }
};

exports.dateRange = async (req, res) => {
  try {
    var filter = {};
    filter.endDate = {
      $gte: new Date(req.body.startDate), // start of date
      $lt: new Date(req.body.endDate), // end of date
    };

    users.aggregate([{ $match: filter }]).exec(function (err, data) {
      if (data.length > 0) {
        let total = data.length;
        res.status(200).send({
          message: "Data Found",
          Total: total,
          data: data,
        });
        // return res.send(data);
      } else {
        let total = data.length;
        res.status(200).send({
          message: "No Data Found",
          Total: total,
          data: [],
        });
        // return res.send(data);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Required Fileds Are Not Valid",
      data: error,
    });
  }
};

exports.Getusers = async (req, res) => {
  try {
    const filterData = await user.find({});
    console.log(filterData);

    if (filterData.length > 0) {
      let total = filterData.length;
      // filterData.push(total);
      res.status(200).send({
        message: "Data Found",
        Total: total,
        data: filterData,
      });
    } else {
      let total = filterData.length;
      res.status(200).send({
        message: "No Data Found",
        Total: total,
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Required Fileds Are Not Valid",
      data: error,
    });
  }
};
