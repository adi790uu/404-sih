import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Hero from '../components/Hero'
import CardBox from '../components/CardBox';
import {Grid, Typography, Card, Button} from '@mui/material';
import './Home.css'





import {CardContent, CardActions} from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import MarqueeSlide from '../components/MarqueeSlide';


const Home = () => {
  return (
   
    <div style={{margin:'30px'}}>
      <Hero/>

      <Grid container spacing={2}>
        <Grid item xs={12}>
  <Box sx={{ flexGrow: 1, display: 'flex', boxShadow:6 , padding:'30px', borderRadius:'20px',margin:4, marginTop:0 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid item xs={12} sm={12} md={12}> <Typography gutterBottom variant="h5" component="div">
          Seek Help
        </Typography></Grid>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
          <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' , flex:2}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
        
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 100, flex:1 }}
        image="https://media.istockphoto.com/id/1323529010/vector/fire-vector-isolated.jpg?s=612x612&w=0&k=20&c=ta6bKkXZDuqy2H3tRhR79sSl_-fdGhKyoenbbjEr3l0="
        alt="Live from space album cover"
      />
    </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Grid>
  <Grid item xs={9}>
  
  <Box sx={{ flexGrow: 1, display: 'flex', boxShadow:6 , padding:'20px', borderRadius:'20px',margin:4 }}>
 
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className='scrollable-div'>
      <Grid item xs={12} sm={12} md={12}> <Typography gutterBottom variant="h5" component="div" >
          Current News
        </Typography></Grid>
        {Array.from(Array(9)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <CardBox/>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Grid>


  


  <Grid item xs={3}>
  <Box sx={{ flexGrow: 1, display: 'flex', boxShadow:6 , padding:'20px', borderRadius:'20px',margin:4, marginLeft:0}} >
      <Grid container spacing={{ xs: 2, md: 3 }} className='scrollable-div'>
      <Grid item xs={12} sm={12} md={12}> <Typography gutterBottom variant="h5" component="div">
          other section
        </Typography></Grid>
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={12} sm={12} md={12} key={index}>
            <CardBox others={true}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Grid>




  <Grid item xs={12}>
    <MarqueeSlide/>
  </Grid>
  
  </Grid>
      


  
  
    </div>

  )
}

export default Home





