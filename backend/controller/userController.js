const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, cell } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(560);
    throw new Error("User with this email already exists.");
  }
  const user = await User.create({
    name: name,
    email: email,
    password: password,
    cell: cell,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      cell: user.cell,
      token: generateToken(user._id),
      message: "Success",
    });
  } else {
    console.log("here");
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  console.log(user);

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      cell: user.cell,
      requested: user.requested,
      helped: user.helped,
      rewardPoints: user.rewardPoints,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, loginUser };
