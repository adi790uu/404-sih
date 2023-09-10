const path = require('path');
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const url = process.env.URL;
const dbStart = require('./config/db');
const cors = require('cors');

app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
app.use(cors());
app.use(express.json());

app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/test', require('./routes/testroute'));
app.use('/api/v1/agency', require('./routes/agencyRoutes'));

app.get('/status', (req, res) => {
  res.json({ msg: 'Api working...' });
});

dbStart(url);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log('Server running');
});
