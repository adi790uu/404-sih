const mongoose = require('mongoose');
const User = require('../models/userSchema');

const requestSchema = new mongoose.Schema(
  {
    requestType: {
      type: String,
      required: true,
      trim: true,
    },
    medicalAssistance: {
      type: String,
      default: false,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    ongoing: {
      type: Boolean,
      default: false,
    },
    pending: {
      type: Boolean,
      default: true,
    },
    closed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
