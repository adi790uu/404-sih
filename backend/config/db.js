const mongoose = require('mongoose');

const dbStart = async url => {
  await mongoose.connect(url);
  console.log('Connected to database');
};

module.exports = dbStart;
