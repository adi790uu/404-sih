const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Agency = require('../models/agencySchema');
const Request = require('../models/requestSchema');

const registerAgency = async (req, res) => {
  const { agencyName, password, location, uniqueId, service } = req.body;

  // console.log(req.body);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const agency = await Agency.findOne({ agencyName });

  if (agency) {
    return res.json({ msg: 'Agency already exists' });
  }

  const newAgency = await Agency.create({
    agencyName,
    password: hash,
    location,
    uniqueId,
    service,
  });

  const payload = {
    id: newAgency._id,
  };

  const token = jwt.sign(payload, process.env.SECRET);

  if (newAgency) {
    return res.json({
      userType: 'agency',
      msg: 'Agency Created',
      token: token,
      agencyName: agencyName,
    });
  }
  return res.json({ msg: 'Some error occured' });
};

const authAgency = async (req, res) => {
  const { agencyName, password } = req.body;
  const agency = await Agency.findOne({ agencyName });

  if (agency) {
    const payload = {
      id: agency._id,
    };

    const token = jwt.sign(payload, process.env.SECRET);
    const isMatch = await bcrypt.compare(password, agency.password);
    if (isMatch) {
      return res.json({
        userType: 'agency',
        msg: 'Agency logged in',
        token: token,
        agencyName: agencyName,
      });
    }
    return res.json({ msg: 'Invalid credentials' });
  }

  res.json({ msg: 'Agency not found' });
};

const getAgencies = async (req, res) => {
  const agencies = await Agency.find();
  res.json({ agencies });
};

const getRequests = async (req, res) => {
  console.log(req.user);
  const agency = await Agency.findById({ _id: req.user });
  console.log(agency);

  const requests = await Request.find({
    requestType: agency.service,
  });

  if (requests) {
    return res.status(201).json(requests);
  }
  return res.json({ msg: 'Some error occured' });
};

module.exports = { registerAgency, authAgency, getAgencies, getRequests };
