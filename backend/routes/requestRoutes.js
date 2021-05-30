const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createRequest,
  getRequest,
  updateReqStatus,
  getRequestByUser,
} = require("../controller/requestController");

router.route("/").post(protect, createRequest).get(getRequest);
// router.get("/:id", getRequestByUser);
router.route("/:id").get(getRequestByUser);
router.post("/update/:status", updateReqStatus);

module.exports = router;
