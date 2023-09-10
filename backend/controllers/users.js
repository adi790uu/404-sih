const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.findOne({ username });

  if (user) {
    return res.json({ msg: 'User already exists' });
  }

  const newUser = await User.create({ username, password: hash });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });

  if (newUser) {
    return res.json({ msg: 'User Created', token: token });
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

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.json({ msg: 'User logged in', token: token });
    }
    return res.json({ msg: 'Invalid credentials' });
  }

  res.json({ msg: 'User not found' });
};

const getUser = async (req, res) => {
  const userId = req.user;
  const keyword = req.query.keyword;
  let user;

  if (keyword) {
    user = await User.findById(keyword)
      .populate('likes')
      .populate('favorites')
      .populate('postsCreated');
  } else {
    user = await User.findById(userId)
      .populate('likes')
      .populate('favorites')
      .populate('postsCreated');
  }

  if (user) {
    return res.json({ msg: 'Success', user: user });
  }

  res.json({ msg: 'Failed' });
};

module.exports = { registerUser, authUser, getUser };
