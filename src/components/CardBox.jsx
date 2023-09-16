import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardBox(data) {
  console.log(data?.data?.author);
  return (
    <Card sx={{ maxWidth: 345, }}>
      {data && (
        <CardMedia
          sx={{ height: 140 }}
          image={data?.data?.urlToImage}
          title="green iguana"
        />
      )}

      <CardContent>
        <Typography gutterBottom  component="div" sx={{fontSize:'18px', lineHeight:'21px'}}>
          {data?.data?.title}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary" sx={{fontSize:'12px'}}>
        {data?.data?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
