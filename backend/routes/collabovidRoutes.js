const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createCollab,
  getCollabByUser,
} = require("../controller/collabovidController");

router.route("/").post(createCollab);
router.route("/:id").get(getCollabByUser);

module.exports = router;
