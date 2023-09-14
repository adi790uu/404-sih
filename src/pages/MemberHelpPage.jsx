import React from "react";

import CardContent from "@mui/material/CardContent";
import { Container, TextField, Grid, Card, Box } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MemberHelpPage() {
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
              Need Assistance
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-label">assistance</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={disaster}
                label="assistance"
                onChange={handleChange}
              >
                <MenuItem value={"Fire Hazard"}>Ambulance</MenuItem>
                <MenuItem value={"Flood"}>rescue team</MenuItem>
                <MenuItem value={"let it be X"}>police</MenuItem>
                <MenuItem value={"let it be Y"}>Let it be X</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              fullWidth
              id="desc"
              label="description"
              name="desc"
            />

<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
  <label for="vehicle1"> I have a bike</label><br />
  <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
  <label for="vehicle2"> I have a car</label><br />
  <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
  <label for="vehicle3"> I have a boat</label><br />
  <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
  <label for="vehicle3"> I have a boat</label>

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
