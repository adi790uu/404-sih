const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    adhaarId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
