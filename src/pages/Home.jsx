import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Hero from '../components/Hero';
import BasicAccordion from '../components/BasicAccordion';
import CardBox from '../components/CardBox';
import { Grid, Typography, Card, Button } from '@mui/material';
import './Home.css';

import { CardContent, CardActions } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import MarqueeSlide from '../components/MarqueeSlide';
import UserReportingMap from '../components/UserReportingMap';
import AllAgenciesMap from '../components/AllAgenciesMap';

const Home = () => {
  const API_KEY = '456ca6ec48d8445a964799f7d0446254';
  const url = 'https://newsapi.org/v2/everything?q=';
  const [articles, setArticles] = React.useState([]);

  const fetchDisasterNews = async () => {
    const disasterQuery = 'disasters';
    try {
      const res = await fetch(`${url}${disasterQuery}&apiKey=${API_KEY}`);
      const data = await res.json();
      if (data) {
        setArticles(data.articles.slice(0, 20));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log('uuuuuuuuuuuuuuuuuuuuuuu', articles);

  const Arrayy = [
    { name: 'Hospital', desc: 'Medical Help center', imgUrl:'https://static.vecteezy.com/system/resources/previews/014/322/451/original/hospital-icons-design-in-blue-circle-png.png' },
    { name: 'Fire Agency', desc: 'put out fire' , imgUrl:'https://media.istockphoto.com/id/1323529010/vector/fire-vector-isolated.jpg?s=612x612&w=0&k=20&c=ta6bKkXZDuqy2H3tRhR79sSl_-fdGhKyoenbbjEr3l0='},
    { name: 'Police', desc: 'Kaha hai !', imgUrl:'https://cdn-icons-png.flaticon.com/512/5600/5600529.png' },
    { name: 'Rescue Team', desc: 'Rescue people from flood etc', imgUrl:'https://cdn-icons-png.flaticon.com/512/3900/3900756.png' },
  ];
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem('profile')),
  );
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
    fetchDisasterNews();
  }, []);
  console.log(user?.userType);

  return (
    <div style={{ margin: '30px' }}>
      {user?.userType === 'normal-user' && <Hero />}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              boxShadow: 6,
              padding: '30px',
              borderRadius: '20px',
              margin: 4,
              marginTop: 0,
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={12} md={12}>
                {' '}
                <Typography gutterBottom variant="h5" component="div">
                  Agencies around you:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <AllAgenciesMap />
              </Grid>
              {Arrayy.map((data, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Card sx={{ display: 'flex' }}>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', flex: 2 }}
                    >
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                          {data.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {data.desc}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{ width: '80px', flex: 1 }}
                      image={data.imgUrl}
                      alt="Live from space album cover"
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              boxShadow: 6,
              padding: '20px',
              borderRadius: '20px',
              margin: 4,
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              className="scrollable-div"
            >
              <Grid item xs={12} sm={12} md={12}>
                {' '}
                <Typography gutterBottom variant="h5" component="div">
                  Current News
                </Typography>
              </Grid>
              {articles.map((data, index) => {
                return (
                  <Grid item xs={2} sm={4} md={4}>
                    <CardBox data={data} key={index} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={3}>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              boxShadow: 6,
              padding: '20px',
              borderRadius: '20px',
              margin: 4,
              marginLeft: 0,
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              className="scrollable-div"
            >
              <Grid item xs={12} sm={12} md={12}>
                {' '}
                <Typography gutterBottom variant="h5" component="div">
                  other section
                </Typography>
              </Grid>
              {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={12} sm={12} md={12} key={index}>
                  <CardBox others={true} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <div style={{ width: '90%', margin: 'auto' }}>
            <Typography gutterBottom variant="h5" component="div">
              FAQ
            </Typography>
            <BasicAccordion />
          </div>
        </Grid>

        <Grid item xs={12}>
          <MarqueeSlide />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
