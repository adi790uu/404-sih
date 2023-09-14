import Marquee from "react-fast-marquee";
import React from 'react'
import {Box} from '@mui/material';

const MarqueeSlide = () => {
  return (
    
  <Box sx={{ flexGrow: 1, display: 'flex', boxShadow:6 , padding:'30px', borderRadius:'20px',margin:4, marginTop:0 }}>
        <Marquee autoFill="true" pauseOnClick="true" >
        <img src="https://www.unitekemt.com/wp-content/uploads/2022/03/shutterstock_1607600596.jpg" style={{width:'300px', height:'300px', padding:'10px'}}/>
        <img src="https://www.channahonfire.com/wp-content/uploads/2018/04/SwiftwaterRescue.jpg" style={{width:'300px', height:'300px', padding:'10px'}}/>

        <img src="https://images.pexels.com/photos/266403/pexels-photo-266403.jpeg?cs=srgb&dl=pexels-pixabay-266403.jpg&fm=jpg" style={{width:'300px', height:'300px', padding:'10px'}}/>

        <img src="https://www.unitekemt.com/wp-content/uploads/2022/03/shutterstock_1607600596.jpg" style={{width:'300px', height:'300px', padding:'10px'}}/>
        <img src="https://www.channahonfire.com/wp-content/uploads/2018/04/SwiftwaterRescue.jpg" style={{width:'300px', height:'300px', padding:'10px'}}/>

        <img src="https://images.pexels.com/photos/266403/pexels-photo-266403.jpeg?cs=srgb&dl=pexels-pixabay-266403.jpg&fm=jpg" style={{width:'300px', height:'300px', padding:'10px'}}/>
</Marquee>
</Box>
  )
}

export default MarqueeSlide

