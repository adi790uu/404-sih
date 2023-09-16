import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function AdminDashBoardHero() {

  return (
    <Card sx={{ display: 'flex', boxShadow:6 , padding:'20px', borderRadius:'20px',margin:2, marginTop:0}}>
      <Box sx={{ display: 'flex',flex:2,  flexDirection: 'column' }}>
        {/* <CardContent sx={{ flex: '1 0 auto' }}> */}
          <Typography component="div" variant="h5">
            Agency DashBoard
          </Typography>
          {/* <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
          <Button variant="contained" size="large" color="error">
          Large
        </Button> */}
        {/* </CardContent> */}
        
      </Box>
    </Card>
  );
}
