const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cell: {
      type: String,
      required: true,
      unique: true,
    },
    requested: {
      type: Number,
      default: 0,
    },
    helped: {
      type: Number,
      default: 0,
    },
    rewardPoints: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
