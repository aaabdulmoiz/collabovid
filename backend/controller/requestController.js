const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");
const Request = require("../models/requestModel");

const createRequest = asyncHandler(async (req, res) => {
  const {
    requester_id,
    requester_name,
    requester_cell,
    region,
    description,
    category,
    payment,
  } = req.body;
  const reqExists = await Request.findOne({
    requester_id: requester_id,
    req_status: "Active",
  });

  if (reqExists) {
    return res.status(560).json({
      message:
        "There is already a request in process for you. Please mark it complete or wait.",
    });
  }

  const request = await Request.create({
    requester_id: requester_id,
    requester_name: requester_name,
    requester_cell: requester_cell,
    region: region,
    description: description,
    category: category,
    payment: payment,
  });

  if (request) {
    res.status(201).json("Request Created");
  } else {
    res.status(400);
    throw new Error("Inavlid Request");
  }
});

const getRequest = asyncHandler(async (req, res) => {
  const requests = await Request.find({ req_status: "Active" });
  console.log("Getting Requests....".bgGreen);
  if (requests.length >= 1) {
    res.status(201).json(requests);
  } else {
    res.status(400);
    throw new Error("No current online requests.");
  }
});

const getRequestByUser = asyncHandler(async (req, res) => {
  const requests = await Request.find({ requester_id: req.params.id });
  console.log("Getting Requests....".bgGreen);
  if (requests.length >= 1) {
    res.status(201).json(requests);
  } else {
    res.status(400);
    throw new Error("No current online requests.");
  }
});

const updateReqStatus = asyncHandler(async (req, res) => {
  const { req_id } = req.body;

  const reqUpdate = await Request.findOneAndUpdate(
    { _id: req_id },
    {
      $set: { req_status: req.params.status },
      function(err) {
        if (err) {
          console.log(err);
          res.status(400).json({ message: "Could not be updated." });
        } else {
        }
      },
    }
  );

  if (reqUpdate) {
    res.status(200).json({ message: "Request Updated" });
  } else {
    throw new Error("Please try again");
  }
});

module.exports = {
  createRequest,
  getRequest,
  updateReqStatus,
  getRequestByUser,
};
