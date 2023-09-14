import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Footer = () => {
  return (
    <div>
      <Box
        sx={{
          boxShadow: 6,
          padding: "30px",
          height: "100px",
          bgcolor: "#1A2421",
          color: "white",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index} style={{textAlign:'center'}}>
              footer link
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Footer;
