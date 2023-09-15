import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Button } from '@mui/material';

const ListItemCss = {boxShadow:'0 0 10px 0 rgba(0,0,0,0.2) inset', padding:'20px', marginBottom:'20px', borderRadius:'20px'}

export default function AdminDashBoardSideBar() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper', margin:2, borderLeft: '5px solid #1976d2'  }}
    //   boxShadow: '-20px 0 10px -20px rgba(0,0,0,0.45) inset'

      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{fontSize:'20px', fontWeight:'bold', textDecoration:'underline'}}>
          Collab Requests
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemText primary="Sent mail" style={ListItemCss}/>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Sent mail" style={ListItemCss}/>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Sent mail" style={ListItemCss}/>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Sent mail" style={ListItemCss}/>
      </ListItemButton>
     
      
      
    </List>
  );
}
