import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AdminDashBoardTabs from "../components/AdmindashBoard/AdmindashBoardTabs";
import AdminDashBoardSideBar from "../components/AdmindashBoard/AdmindashBoardSideBar";
import AdminDashBoardHero from "../components/AdmindashBoard/AdminDashBoardHero";

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

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const AdminDashBoard = () => {
    const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ }}>
          <AdminDashBoardHero/>
        </Grid>
        <Grid item xs={2} sx={{  }}>
          <AdminDashBoardSideBar/>
        </Grid>
        <Grid item xs={10} sx={{ height: "inherit" }}>
          <AdminDashBoardTabs/>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashBoard;
