import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

export default function AdminDashBoardAccodion() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{boxShadow:'0 0 10px 0 rgba(0,0,0,0.2) inset', padding:'20px'}}>

{/* box-shadow: 0 0 10px 0 rgba(0,0,0,0.45) inset; */}

{/* 0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 6px 8px rgba(0,0,0,0.11), 0 8px 16px rgba(0,0,0,0.11) */}

    <div style={{display:'flex', justifyContent:'space-between'}}>
    <Typography sx={{ width: '33%', flexShrink: 0 , flex:1}}>
            Fire Hazard
          </Typography>
          <Typography sx={{ color: 'text.secondary', flex:3 }}>
          3rd Cross, Kumar swamy Layout
          </Typography>
    
      <Button variant='contained' style={{width:"100px"}}>Accept</Button> &nbsp;
    
    </div>
    <br />
   
     
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} style={{width:'70%'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
          sx={{display: 'flex', justifyContent: 'space-around'}}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Filtering has been entirely disabled for whole web server
          </Typography>

         
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
     
    </div>
  );
}
