const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const url = process.env.URL;
const dbStart = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const { Server } = require('socket.io');
const User = require('./models/userSchema');
const Request = require('./models/requestSchema');
const Agency = require('./models/agencySchema');

app.use(
  cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    credentials: true, // Enable CORS with credentials (cookies, authorization headers, etc.)
  }),
);

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/agency', require('./routes/agencyRoutes'));

app.get('/status', (req, res) => {
  res.json({ msg: 'Api working...' });
});

dbStart(url);

const server = app.listen(port, () => {
  console.log('Server running');
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`User connected! ${socket.id}`);

  socket.on('sendInfo', async (data) => {
    const { type, location } = data;
    const userId = req.user;
    const user = await User.findById(userId);

    const info = await Request.create({
      RequestType: type,
      location: location,
      user: user,
    });

    socket.emit('userRequest', info);
  });

  socket.on('requestTaken', async (data) => {
    const { requestId, agencyId } = data;
    const request = await Request.findById(requestId);
    const agency = await Agency.findById(agencyId);

    agency.busy = true;
    agency.active = false;

    request.pending = false;
    request.ongoing = true;

    await agency.save();
    await request.save();

    const agencies = await Agency.find();
    socket.emit('updatedState', agencies);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected!`);
  });
});

app.use(errorHandler);
