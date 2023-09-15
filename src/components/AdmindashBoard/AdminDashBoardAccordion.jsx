import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function AdminDashBoardAccordion({req}) {

  const agencyName = JSON.parse(localStorage.getItem('profile'))?.agencyName;

  const { requestType, location,_id, medicalAssistance, user} = req;
  // console.log("///////////////////////////",req);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const socketData = {
    requestId: _id,
    agencyName,
    city:'Bangalore'
  }

  const handleAccept =()=>{
    socket.emit('requestTaken', socketData);
  }

 

  return (
    <div style={{boxShadow:'0 0 10px 0 rgba(0,0,0,0.2) inset', padding:'20px', marginBottom:'20px', borderRadius:'20px'}}>
    <div style={{display:'flex', justifyContent:'space-between'}}>
    <Typography sx={{ width: '33%', flexShrink: 0 , flex:1}}>
           {requestType}
          </Typography>
          <Typography sx={{ color: 'text.secondary', flex:3 }}>
          {location}
          </Typography>

          {medicalAssistance && (
            <Typography sx={{ color: 'text.secondary', flex:3 }}>
            Medical Assistance Required
            </Typography>
          )}

          
    
    
      <Button variant='contained' style={{width:"100px"}} onClick={handleAccept}>Accept</Button> &nbsp;
    
    </div>
    <br />
   
     
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} style={{width:'70%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          sx={{display: 'flex', justifyContent: 'space-around'}}
        >
          {_id && (
                     <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Issue Id: {_id}
                   </Typography>
          )}
         
          

         
        </AccordionSummary>
        <AccordionDetails>
          {user && (
            <Typography>
           User Id:  {user}
          </Typography>
          )}
          
        </AccordionDetails>
      </Accordion>
     
    </div>
  );
}


