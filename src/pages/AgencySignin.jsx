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
import {agencysignin} from '../actions/auth';


export default function AgencySignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    agencyName:'', password:''
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    dispatch(agencysignin(formData, navigate))
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (

      <Container component="main" maxWidth="xs" sx={{marginBottom:6}}>
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
            Agency Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In as Agency
            </Button>
            <Grid container>
              <Grid item>
              <Button>
                <Link to='/agencysignup'>
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