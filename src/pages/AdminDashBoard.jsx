import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import AdminDashBoardTabs from '../components/AdmindashBoard/AdmindashBoardTabs';
import AdminDashBoardSideBar from '../components/AdmindashBoard/AdmindashBoardSideBar';
import AdminDashBoardHero from '../components/AdmindashBoard/AdminDashBoardHero';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const AdminDashBoard = () => {
  const [value, setValue] = useState(0);
  const [requests, setRequests] = useState([]);
  const [collabData, setCollabData] = useState([]); // Initialize as an empty array
  const [data, setData] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const agencyName = JSON.parse(localStorage.getItem('profile'))?.agencyName;
  // console.log(JSON.parse(localStorage.getItem('profile')));

  const city = 'Bangalore';

  const socketDataObject = {
    agencyName,
    city,
  };

  useEffect(() => {
    socket.emit('joinRoom', socketDataObject);
    loadData();
    loadCollabData();
  }, []);

  socket.on('updatedState', (data) => {
    console.log('oooooooooooooooooooooooooo', data);
    setRequests(data);
  });

  socket.on('collab', (data) => {
    console.log(data);
  });

  useCallback(() => {
    socket.on('sendToAgencies', (data) => {
      console.log('data---->', data);
      setData(data);
      // Update the requests state with the new data
      setRequests((prevRequests) => [...prevRequests, data]);
    });
  }, [requests]);

  const token = JSON.parse(localStorage.getItem('profile'))?.token;
  // console.log("tgdfhgfjhgjhkgk",token);

  const loadData = async () => {
    let response = await fetch(
      'http://localhost:4000/api/v1/agency/getRequests',
      {
        method: 'POST',
        headers: {
          // Use "headers" (plural) here
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    try {
      if (response.ok) {
        let responseData = await response.json();
        setRequests(responseData);
        // console.log(responseData);
      } else {
        console.error(
          'Failed to fetch data:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error parsing response:', error);
    }
  };

  const loadCollabData = async () => {
    let response = await fetch(
      'http://localhost:4000/api/v1/agency/fetchCollab',
      {
        method: 'GET',
        headers: {
          // Use "headers" (plural) here
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    try {
      if (response.ok) {
        let collabData = await response.json();
        setCollabData(collabData);
        console.log(collabData);
      } else {
        console.error(
          'Failed to fetch data:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error parsing response:', error);
    }
  };

  // console.log("adi::::::",requests);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{}}>
          <AdminDashBoardHero />
        </Grid>
        <Grid item xs={8} sx={{ height: 'inherit' }}>
          {requests ? <AdminDashBoardTabs requests={requests} /> : ''}
        </Grid>
        <Grid item xs={4} sx={{}}>
          <AdminDashBoardSideBar collabData={collabData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashBoard;
