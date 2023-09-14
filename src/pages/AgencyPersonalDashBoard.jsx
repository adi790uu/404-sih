import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AgencyPersonalDashBoard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Card
        sx={{
          display: 'flex',
          boxShadow: 6,
          padding: '20px',
          borderRadius: '20px',
          margin: 2,
          marginTop: 0,
        }}
      >
        <Box sx={{ display: 'flex', flex: 2, flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              Agency Personal DashBoard
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Requests asked by team members
            </Typography>
          </CardContent>
        </Box>
      </Card>

      <Box sx={{ padding:'50px' }}>
        {/* <AdminDashBoardAccodion /> <br />
        <AdminDashBoardAccodion /> <br />
        <AdminDashBoardAccodion /> <br />
        <AdminDashBoardAccodion /> <br /> */}


        <div style={{display:'flex', justifyContent:'space-between', boxShadow:'0 0 10px 0 rgba(0,0,0,0.2) inset', padding:'20px'}}>
    <Typography sx={{ width: '33%', flexShrink: 0 , flex:1}}>
            Fire Hazard
          </Typography>
          <Typography sx={{ color: 'text.secondary', flex:3 }}>
          3rd Cross, Kumar swamy Layout
          </Typography>

      <Button variant="outlined">Done</Button>

    </div>
      </Box>
    </div>
  );
};

export default AgencyPersonalDashBoard;
