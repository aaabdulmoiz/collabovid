const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
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
    region: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      default: "No",
    },
    req_status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Requests", requestSchema);

module.exports = Request;
