import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();

  };

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
            Sign up as Agency
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={6}>
            <img src="https://fox59.com/wp-content/uploads/sites/21/2022/02/Firefighter-cat-rescue.jpg?w=540" alt='trust image' width="500px" height="480px"/>
          </Grid>
          <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="agencyname"
                  label="Agency Name"
                  name="agencyname"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="agencypnumber"
                  required
                  fullWidth
                  id="agencypnumber"
                  label="Agency Phone Number"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="agencyemail"
                  label="agency Email"
                  name="agencyemail"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="agencyNumber"
                  label="Agency Number"
                  id="agencyNumber"
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
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="email"
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
              </Grid>
              <Grid item xs={6}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign Up as Agency
            </Button>
              </Grid>
              
            </Grid>
          </Grid>
          </Grid>
            
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                   Sign in as Agency
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}