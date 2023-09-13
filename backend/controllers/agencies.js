const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Agency = require('../models/agencySchema');
const Request = require('../models/requestSchema');

const registerAgency = async (req, res) => {
  const { orgName, password, location, uniqueId, service } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const agency = await Agency.findOne({ orgName });

  if (agency) {
    return res.json({ msg: 'Agency already exists' });
  }

  const newAgency = await Agency.create({
    orgName,
    password: hash,
    location,
    uniqueId,
    service,
  });

  const payload = {
    id: newAgency._id,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '48h' });

  if (newAgency) {
    return res.json({ msg: 'Agency Created', token: token, orgName: orgName });
  }
  return res.json({ msg: 'Some error occured' });
};

const authAgency = async (req, res) => {
  const { orgName, password } = req.body;
  const agency = await Agency.findOne({ orgName });

  if (agency) {
    const payload = {
      id: agency._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '48h' });
    const isMatch = await bcrypt.compare(password, agency.password);
    if (isMatch) {
      return res.json({
        msg: 'User logged in',
        token: token,
        orgName: orgName,
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
  const { type } = req.body;
  const requests = await Request.find({ RequestType: type });
  if (requests) {
    return res.status(201).json(requests);
  }
  return res.json({ msg: 'Some error occured' });
};

module.exports = { registerAgency, authAgency, getAgencies, getRequests };
