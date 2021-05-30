const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");
const Request = require("../models/requestModel");
const Collabovid = require("../models/collabovidModel");

const createCollab = asyncHandler(async (req, res) => {
  const {
    req_id,
    req_category,
    req_description,
    req_payment,
    req_region,
    requester_id,
    requester_name,
    requester_cell,
    helper_id,
    helper_name,
    helper_cell,
  } = req.body;

  const collabExists = Request.findOne({ _id: req_id, req_status: "Active" });
  if (!collabExists) {
    res.status(409); //409 conflict
    throw new Error("The request is already in progress.");
  } else {
    const collabovid = await Collabovid.create({
      req_id: req_id,
      req_category: req_category,
      req_description: req_description,
      req_payment: req_payment,
      req_region: req_region,
      requester_id: requester_id,
      requester_name: requester_name,
      requester_cell: requester_cell,
      helper_id: helper_id,
      helper_name: helper_name,
      helper_cell: helper_cell,
    });

    if (collabovid) {
      res.status(201).json(collabovid);
    } else {
      res.status(400);
      throw new Error("Invalid Collab. Please try again later.");
    }
  }
});

const getCollabByUser = asyncHandler(async (req, res) => {
  const collabsReq = await Collabovid.find({ requester_id: req.params.id });
  const collabsHelp = await Collabovid.find({ helper_id: req.params.id });
  const collabs = await collabsReq.concat(collabsHelp);
  console.log("Getting Collabs....".bgGreen);
  if (collabs.length >= 1) {
    res.status(201).json(collabs);
    console.log("Collabs Retrieved".bgGreen);
  } else {
    res.status(400);
    throw new Error("No current online requests.");
  }
});

module.exports = { createCollab, getCollabByUser };

// req_id: {
//   type: String,
//   required: true,
// },
// req_category: {
//   type: String,
//   required: true,
// },
// req_description: {
//   type: String,
//   required: true,
// },
// req_region: {
//   latitude: {
//     type: Number,
//     required: true,
//   },
//   longitude: {
//     type: Number,
//     required: true,
//   },
// },
// requester_id: {
//   type: String,
//   required: true,
// },
// requester_name: {
//   type: String,
//   required: true,
// },
// requester_cell: {
//   type: String,
//   required: true,
// },
// helper_id: {
//   type: String,
//   required: true,
// },
// helper_name: {
//   type: String,
//   required: true,
// },
// helper_cell: {
//   type: String,
//   required: true,
// },
// collab_status: {
//   type: String,
//   default: "Active",
// },
