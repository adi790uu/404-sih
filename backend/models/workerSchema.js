const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      index: 'text',
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNum: {
      type: String,
      required: true,
      trim: true,
    },

    employeeId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
