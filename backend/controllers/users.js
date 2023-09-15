const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Worker = require('../models/workerSchema');

const registerUser = async (req, res) => {
  const { email, password, phoneNum, adhaarId } = req.body;
  console.log(email);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    // Attempt to create a new user
    const newUser = await User.create({
      email,
      password: hash,
      phoneNum,
      adhaarId,
    });

    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, process.env.SECRET);

    return res.json({
      userType: 'normal-user',
      msg: 'User Created',
      token: token,
      email,
      phoneNum,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email === 1) {
      // The error code 11000 indicates a duplicate key error,
      // and error.keyPattern.email === 1 checks if the duplicate key is on the email field.
      return res.json({ msg: 'User already exists' });
    } else {
      console.error(error);
      return res.json({ msg: 'Some error occurred' });
    }
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.json({
        userType: 'normal-user',
        msg: 'User logged in',
        token: token,
        email: user.email,
        phoneNum: user.phoneNum,
      });
    }
    return res.json({ msg: 'Invalid credentials' });
  }

  res.json({ msg: 'User not found' });
};

const registerEmployee = async (req, res) => {
  const { email, password, phoneNum, employeeId, agencyName } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await Worker.findOne({ email });

  if (user) {
    return res.json({ msg: 'User already exists' });
  }

  const newEmployee = await Worker.create({
    email,
    password: hash,
    phoneNum,
    employeeId,
    agencyName,
  });

  const payload = {
    id: newEmployee._id,
  };

  const token = jwt.sign(payload, process.env.SECRET);

  if (newEmployee) {
    return res.json({
      userType: 'worker',
      msg: 'User Created',
      token: token,
      email,
      phoneNum,
    });
  }
  return res.json({ msg: 'Some error occured' });
};

const authEmployee = async (req, res) => {
  const { email, password } = req.body;
  const employee = await Worker.findOne({ email });
  console.log(employee);

  if (employee) {
    const payload = {
      id: employee._id,
    };

    const token = jwt.sign(payload, process.env.SECRET);
    const isMatch = await bcrypt.compare(password, employee.password);
    if (isMatch) {
      return res.json({
        userType: 'worker',
        msg: 'Worker logged in',
        token: token,
        email: email,
        phoneNum: employee.phoneNum,
      });
    }
    return res.json({ msg: 'Invalid credentials' });
  }

  res.json({ msg: 'User not found' });
};

const getWork = (req, res) => {
  
}

module.exports = { registerUser, authUser, registerEmployee, authEmployee, getWork };
