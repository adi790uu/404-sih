import React, { useState, useEffect } from 'react';
import { Container, TextField, Grid, Card, Box } from '@mui/material';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import io from 'socket.io-client';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPost } from '../actions/posts';

import MarqueeSlide from './MarqueeSlide';

const socket = io('http://localhost:4000');

export default function Hero() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [navigate]);

  const [disaster, setDisaster] = useState('');
  const [medicalAss, setMedicalAss] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    requestType: '',
    medicalAssistance: medicalAss,
    city: 'Bangalore',
    phoneNum: user?.phoneNum,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // dispatch(createPost(formData, navigate));
    socket.emit('sendInfo', formData);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCheckBox = (event) => {
      const selectedDisaster = event.target.value;
      setDisaster(selectedDisaster); // Update the disaster state
      setFormData({ ...formData, requestType: selectedDisaster }); // Update the requestType field in formData
    };
    

  const handleMedicalAss = (event) => {
    setMedicalAss(event.target.value);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        boxShadow: 6,
        padding: '20px',
        borderRadius: '20px',
        margin: 4,
      }}
    >
      <div style={{ width: '600px', margin: 0 }}>
        <br />
        <MarqueeSlide />
      </div>

      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
              Seek Help SOS
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">Disaster</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={disaster}
                label="Age"
                onChange={handleCheckBox}
              >
                <MenuItem value={'fire'}>Fire</MenuItem>
                <MenuItem value={'Flood'}>Flood</MenuItem>
                <MenuItem value={'Road Accident'}>Road Accident</MenuItem>
                <MenuItem value={'Rescue'}>Rescue</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Fetch Location
            </Button>
            <input
              type="checkbox"
              id="vehicle3"
              name="vehicle3"
              value="true"
              style={{ height: ' 25px', width: '25px' }}
              onChange={handleMedicalAss}
            />
            <label for="vehicle3" style={{ fontSize: '20px' }}>
              {' '}
              need medical assistance
            </label>{' '}
            <br />
            <br />
            <Button
              variant="contained"
              size="large"
              color="error"
              fullWidth
              sx={{ height: '70px' }}
              type='submit'
            >
              Help
            </Button>
          </Box>
        </Box>
      </Container>
    </Card>
  );
}
