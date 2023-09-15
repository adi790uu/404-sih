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
const Collab = require('./models/collaborationSchema');

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }),
);

app.use(express.json());
app.use(cors());
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
  // console.log(`User connected! ${socket.id}`);

  socket.on('joinRoom', async (data) => {
    const { agencyName, city } = data;
    const agency = await Agency.findOne({ agencyName });
    console.log(`${agency.service}-${city}`);
    socket.join(`${agency.service}-${city}`);
  });

  socket.on('sendInfo', async (data) => {
    console.log(data);
    const { requestType, location, phoneNum, medicalAssistance, city } = data;
    const user = await User.findOne({ phoneNum: phoneNum });

    const info = await Request.create({
      requestType: requestType,
      medicalAssistance: medicalAssistance,
      location: location,
      user: user._id,
    });
    console.log(info);
    console.log(`${requestType}-${city}`);
    socket.to(`${requestType}-${city}`).emit('sendToAgencies', info);
  });

  socket.on('collab', async (data) => {
    const {
      fire,
      hospital,
      police,
      rescue,
      description,
      location,
      requestId,
      city,
    } = data;
    const collabRequest = await Collab.create({
      fire,
      hospital,
      police,
      rescue,
      location,
      requestId,
      description,
    });

    const collabData = await collabRequest.populate('request');

    const typ1 = `fire-${city}`;
    const typ2 = `hospital-${city}`;
    const typ3 = `police-${city}`;
    const typ4 = `rescue-${city}`;

    if (fire) {
      socket.to(typ1).emit('collab', collabData);
    }

    if (hospital) {
      socket.to(typ2).emit('collab', collabData);
    }

    if (police) {
      socket.to(typ3).emit('collab', collabData);
    }

    if (rescue) {
      socket.to(typ4).emit('collab', collabData);
    }
  });

  socket.on('requestTaken', async (data) => {
    const { requestId, agencyName, city } = data;
    const updateCurrentRequest = await Request.updateOne({
      currentRequest: requestId,
    });
    const request = await Request.findByIdAndDelete(requestId);
    const agency = await Agency.findOne({ agencyName: agencyName });
    const type = agency.service;

    const requests = await Request.find({
      requestType: type,
    });

    const roomType = `${type}-${city}`;
    console.log(roomType);
    socket.to(roomType).emit('updatedState', requests);
  });

  socket.on('acceptCollab', async (data) => {
    const { agencyId, city } = data;
    const agency = await Agency.find(agencyId);

    agency.busy = true;
    agency.active = false;

    await agency.save();

    const typ = `${agency.type}-${city}`;
    const agencies = await Agency.find();

    socket.to(typ).emit('updatedCollabState', agencies);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected!`);
  });
});

app.use(errorHandler);
