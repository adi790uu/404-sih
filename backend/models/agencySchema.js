const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema(
  {
    org: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      index: 'text',
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    uniqueId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Agency = mongoose.model('Agency', agencySchema);

//git check

module.exports = Agency;
