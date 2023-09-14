import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import AdminDashBoardTabs from "../components/AdmindashBoard/AdmindashBoardTabs";
import AdminDashBoardSideBar from "../components/AdmindashBoard/AdmindashBoardSideBar";
import AdminDashBoardHero from "../components/AdmindashBoard/AdminDashBoardHero";

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
        {/* <Grid item xs={2} sx={{  }}>
          <AdminDashBoardSideBar/>
        </Grid> */}
        <Grid item xs={12} sx={{ height: "inherit" }}>
          <AdminDashBoardTabs/>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashBoard;
