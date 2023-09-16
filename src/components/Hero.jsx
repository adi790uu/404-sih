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
import HomePageMap from './UserReportingMap';
import UserReportingMap from './UserReportingMap';

const socket = io('http://localhost:4000');

export default function Hero() {
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [navigate]);

  const [disaster, setDisaster] = useState('');
  const [medicalAss, setMedicalAss] = useState(false);
  const [formData, setFormData] = useState({
    location: location,
    requestType: '',
    medicalAssistance: medicalAss,
    city: city,
    phoneNum: user?.phoneNum,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // dispatch(createPost(formData, navigate));
    socket.emit('sendInfo', formData);
  };

  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // setCurrentLocation(userLocation);
        // setMarkers([userLocation]);
        // setFinalLocation(userLocation);
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBoHeDRjWztjVjOVtsTPX4rFqE5vkcWW7E`,
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // setGeoCodedData(data.results[0].formatted_address);
            setLocation(data.results[0].formatted_address);
            setCity(data.results[7].address_components[1].short_name);
            console.log(data.results[0].formatted_address);
            console.log(data.results[7].address_components[1].short_name);
          })
          .catch((error) => {
            console.error('Error fetching API data:', error);
          });
        console.log(userLocation);
      },
      (error) => {
        console.error("Error getting user's location:", error);
      },
    );
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
        {/* <MarqueeSlide /> */}
        <UserReportingMap />
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
              value={location}
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              // onChange={handleChange}
              onChange={() => setLocation(e.target.value)}
            />
            <Button
              onClick={handleLocationClick}
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Fetch Current Location
            </Button>
            <label for="vehicle3" style={{ fontSize: '20px' }}>
              <input
                type="checkbox"
                id="vehicle3"
                name="vehicle3"
                value="true"
                style={{ height: ' 25px', width: '25px' }}
                onChange={handleMedicalAss}
              />{' '}
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
              type="submit"
            >
              Help
            </Button>
          </Box>
        </Box>
      </Container>
    </Card>
  );
}
