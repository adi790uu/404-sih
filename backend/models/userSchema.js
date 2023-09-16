const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    phoneNum: {
      type: String,

      trim: true,
    },
    adhaarId: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
