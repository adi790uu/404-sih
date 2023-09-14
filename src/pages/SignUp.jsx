import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signup} from '../actions/auth'


export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:'', phoneNum:'', password:'', adhaarId:'', location:'', email:''
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    dispatch(signup(formData, navigate))
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={6}>
            <img src="https://images.inc.com/uploaded_files/image/1920x1080/getty_872576234_379413.jpg" alt='trust image' width="500px" height="480px"/>
          </Grid>
          <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="phoneNum"
                  required
                  fullWidth
                  id="phoneNum"
                  onChange={handleChange}
                  label="Phone Number"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  onChange={handleChange}
                  label="Email"
                  name="email"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="adhaarId"
                  label="Adhar card Number"
                  id="adhaarId"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
            Fetch Location
            </Button>
              </Grid> */}
              <Grid item xs={6}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign Up
            </Button>
              </Grid>
              
            </Grid>
          </Grid>
          </Grid>
            
            
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Button>
                <Link to='/signin'>
                  Sign in
                </Link>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}