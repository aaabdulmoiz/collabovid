const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser } = require("../controller/userController");

router.route("/").post(registerUser);
router.post("/login", loginUser);

//router.route('/profile').get(protect, getUserProfile);

module.exports = router;
