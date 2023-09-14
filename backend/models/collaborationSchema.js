const mongoose = require('mongoose');
const Request = require('./requestSchema');

const collabSchema = new mongoose.Schema(
  {
    fire: {
      type: Boolean,
      default: false,
    },
    hospital: {
      type: Boolean,
      default: false,
    },
    police: {
      type: Boolean,
      default: false,
    },
    rescue: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      required: true,
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request',
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const Collab = mongoose.model('Collab', collabSchema);
module.exports = Collab;
