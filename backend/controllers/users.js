const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Worker = require('../models/workerSchema');

const registerUser = async (req, res) => {
  const { username, password, phoneNum, adhaarId } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.findOne({ username });

  if (user) {
    return res.json({ msg: 'User already exists' });
  }

  const newUser = await User.create({
    username,
    password: hash,
    phoneNum,
    adhaarId,
  });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '48h' });

  if (newUser) {
    return res.json({ msg: 'User Created', token: token, username, phoneNum });
  }
  return res.json({ msg: 'Some error occured' });
};

const authUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '48h' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.json({
        msg: 'User logged in',
        token: token,
        username: user.username,
        phoneNum: user.phoneNum,
      });
    }
    return res.json({ msg: 'Invalid credentials' });
  }

  res.json({ msg: 'User not found' });
};

const registerEmployee = async (req, res) => {
  const { username, password, phoneNum, employeeId } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.findOne({ username });

  if (user) {
    return res.json({ msg: 'User already exists' });
  }

  const newEmployee = await User.create({
    username,
    password: hash,
    phoneNum,
    employeeId,
  });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '48h' });

  if (newEmployee) {
    return res.json({ msg: 'User Created', token: token, username, phoneNum });
  }
  return res.json({ msg: 'Some error occured' });
};

const authEmployee = async (req, res) => {
  const { username, password } = req.body;
  const employee = await User.findOne({ username });

  if (employee) {
    const payload = {
      id: employee._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '48h' });
    const isMatch = await bcrypt.compare(password, employee.password);
    if (isMatch) {
      return res.json({
        msg: 'User logged in',
        token: token,
        phoneNum: employee.phoneNum,
      });
    }
    return res.json({ msg: 'Invalid credentials' });
  }

  res.json({ msg: 'User not found' });
};

module.exports = { registerUser, authUser, registerEmployee, authEmployee };
