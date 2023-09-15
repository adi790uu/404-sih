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
import {workersignup} from '../actions/auth';


export default function WorkerSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    agencyName:'', email:'', phoneNum:'', password:'',  employeeId:''
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    dispatch(workersignup(formData, navigate))
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
            Sign up as Worker
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={6}>
            <img src="https://fox59.com/wp-content/uploads/sites/21/2022/02/Firefighter-cat-rescue.jpg?w=540" alt='trust image' width="400px" height="400px"/>
          </Grid>
          <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="agencyName"
              label="Agency Name"
              name="agencyName"
              onChange={handleChange}
            />
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="phoneNum"
                  required
                  fullWidth
                  id="phoneNum"
                  label="Your Phone Number"
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="employeeId"
                  label="Agency employeeId"
                  id="employeeId"
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
    
              <Grid item xs={12}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign Up as Worker
            </Button>
              </Grid>
              
            </Grid>
          </Grid>
          </Grid>
            
            
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Button>
                <Link to='/workersignin'>
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