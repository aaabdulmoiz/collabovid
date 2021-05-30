const mongoose = require("mongoose");

const collabovidSchema = mongoose.Schema({
  req_id: {
    type: String,
    required: true,
  },
  req_category: {
    type: String,
    required: true,
  },
  req_description: {
    type: String,
    required: true,
  },
  req_payment: {
    type: String,
    required: true,
  },
  req_region: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  requester_id: {
    type: String,
    required: true,
  },
  requester_name: {
    type: String,
    required: true,
  },
  requester_cell: {
    type: String,
    required: true,
  },
  helper_id: {
    type: String,
    required: true,
  },
  helper_name: {
    type: String,
    required: true,
  },
  helper_cell: {
    type: String,
    required: true,
  },
  collab_status: {
    type: String,
    default: "Active",
  },
});

const Collabovid = mongoose.model("Collabs", collabovidSchema);

module.exports = Collabovid;
