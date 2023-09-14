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

  socket.on('joinRoom', async (data) => {
    const { agencyId, city } = data;
    const agency = await Agency.findById(agencyId);
    socket.join(`${agency.type}-${city}`);
  });

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
    const { requestId, agencyId, city } = data;
    const request = await Request.findById(requestId);
    const agency = await Agency.findById(agencyId);

    const type = agency.type;

    agency.busy = true;
    agency.active = false;

    request.pending = false;
    request.ongoing = true;

    await agency.save();
    await request.save();

    const requests = await Request.find({
      RequestType: { $elemMatch: { $eq: type } },
    });
    const agencies = await Agency.find({ type: type });

    const data = {
      requests,
      agencies,
    };

    const roomType = `type-${city}`;
    socket.to(roomType).emit('updatedState', data);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected!`);
  });
});

app.use(errorHandler);
