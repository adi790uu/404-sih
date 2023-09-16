import React, { useState } from 'react';

import CardContent from '@mui/material/CardContent';
import { Container, TextField, Grid, Card, Box } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function MemberHelpPage() {
  const [hospital, setHospital] = useState(false);
  const [fire, setFire] = useState(false);
  const [police, setPolice] = useState(false);
  const [rescue, setRescue] = useState(false);

  const [formData, setFormData] = useState({
    description: '',
    location: '',
    hospital,
    fire,
    police,
    rescue,
    workerEmail: JSON.parse(localStorage.getItem('profile')).email,
    city:'Bangalore'
  });
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("********",formData);
    socket.emit('collab', formData);
    // let response = await fetch("http://localhost:4000",{
    //   method:"POST",
    //   header:{
    //     'Content-Type':"application/json"
    //   }
    // })
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
  
    setFormData({
      ...formData,
      [name]: newValue,
    });
  
    // Update the corresponding state variables if needed
    if (name === 'hospital') {
      setHospital(newValue);
    } else if (name === 'fire') {
      setFire(newValue);
    } else if (name === 'police') {
      setPolice(newValue);
    } else if (name === 'rescue') {
      setRescue(newValue);
    }
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
              Need Assistance
            </Typography>
            <br />

            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="description"
              name="description"
              onChange={handleChange}
            />

            <label for="fire">
              <input
                type="checkbox"
                id="fire"
                name="fire"
                value="true"
                // onChange={() => setFire(true)}
                onChange={handleChange}
              />
              fire
            </label>
            <br />

            <label for="hospital">
              <input
                type="checkbox"
                id="hospital"
                name="hospital"
                value="true"
                // onChange={() => setHospital(true)}
                onChange={handleChange}
              />
              Hospital
            </label>
            <br />

            <label for="police">
              <input
                type="checkbox"
                id="police"
                name="police"
                value="true"
                // onChange={() => setPolice(true)}
                onChange={handleChange}
              />
              Police
            </label>
            <br />

            <label for="rescue">
              <input
                type="checkbox"
                id="rescue"
                name="rescue"
                value="true"
                // onChange={() => setRescue(true)}
                onChange={handleChange}
              />
              Rescue
            </label>

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

            <Button
              variant="contained"
              type='submit'
              size="large"
              fullWidth
              sx={{ height: '70px', bgcolor:"green" }}
            >
              Help
            </Button>
          </Box>
        </Box>
      </Container>
    </Card>
  );
}
