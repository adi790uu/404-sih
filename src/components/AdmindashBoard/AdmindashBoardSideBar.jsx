import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { Button } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const ListItemCss = {
  boxShadow: '0 0 10px 0 rgba(0,0,0,0.2) inset',
  padding: '20px',
  marginBottom: '20px',
  borderRadius: '20px',
  width: '70%',
  margin: 0,
  alignItem: 'center',
};

export default function AdminDashBoardSideBar(collabData) {
  console.log(collabData.collabData);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const agencyName = JSON.parse(localStorage.getItem('profile')).agencyName

  const acceptCollab = (data) => {
    console.log("ttttttttttttttt",data);
    socket.emit('acceptedCollab', {data,  agencyName}  );
  };

  return (
    // maxWidth: 560,
    // width: '100%',
    <List
      sx={{ margin: 2, borderLeft: '5px solid #1976d2', alignItems: 'center' }}
      //   boxShadow: '-20px 0 10px -20px rgba(0,0,0,0.45) inset'

      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}
        >
          Collab Requests
        </ListSubheader>
      }
    >
      {collabData.collabData.map((data, index) => {
        return (
          <Card style={ListItemCss}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {data.description}
                </Typography>
                <Typography variant="h5" component="div">
                  {data.location}
                </Typography>
              </div>
              <Button
                size="small"
                variant="contained"
                style={{ height: '40px' }}
                onClick={acceptCollab(data)}
              >
                {' '}
                Accept
              </Button>
            </div>
          </Card>
        );
      })}
      {/* <ListItemButton>
        <ListItemText primary="Sent mail" style={ListItemCss}/>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Sent mail" style={ListItemCss}/>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Sent mail" style={ListItemCss}/>
      </ListItemButton> */}
    </List>
  );
}
