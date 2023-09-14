import React, {useState, useEffect} from "react";
import { Container, TextField, Grid, Card, Box } from "@mui/material";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {agencysignup} from '../actions/auth';

import MarqueeSlide from "./MarqueeSlide";

export default function Hero() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [disaster, setDisaster] = React.useState("");

  const handleChange = (event) => {
    setDisaster(event.target.value);
  };

  return (
    <Card
      sx={{
        display: "flex",
        boxShadow: 6,
        padding: "20px",
        borderRadius: "20px",
        margin: 4,
      }}
    >
      <div style={{ width: "600px", margin: 0 }}>
        <br />
        <MarqueeSlide />
      </div>

      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
                onChange={handleChange}
              >
                <MenuItem value={"Fire Hazard"}>Fire Hazard</MenuItem>
                <MenuItem value={"Flood"}>Flood</MenuItem>
                <MenuItem value={"Road Accident"}>Road Accident</MenuItem>
                <MenuItem value={"Rescue"}>Rescue</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              fullWidth
              id="desc"
              label="description"
              name="desc"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              autoComplete="email"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Fetch Location
            </Button>

            <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" style={{height:" 25px",width: '25px'}}/>
  <label for="vehicle3" style={{fontSize:'20px'}}> need medical assistance</label> <br />

<br />
            <Button
              variant="contained"
              size="large"
              color="error"
              fullWidth
              sx={{ height: "70px" }}
            >
              Help
            </Button>
          </Box>
        </Box>
      </Container>
    </Card>
  );
}
