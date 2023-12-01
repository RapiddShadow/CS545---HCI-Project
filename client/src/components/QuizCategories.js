import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams , useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Container} from '@material-ui/core';
import '../App.css';


const QuizCategories = () => {



  const buildCard = (card) => (
    <Card key={card.title}>
      <CardMedia component="img" alt={card.title} height="350" image={card.imageUrl} style={{ width: `${card.imageWidth}px`, height: `${card.imageHeight}px`, objectFit: 'cover' }}/>
      <CardContent>
        <Typography variant="h5" component="div">
          {card.title}
        </Typography>
      </CardContent>
    </Card>
  );



  const cardData = [
    { title: 'Pop Culture', imageUrl: "/images/popculture.png" },
    { title: 'Geography', imageUrl: '/images/geography.png' },
    { title: 'History', imageUrl: '/images/history.png' },
    { title: 'Sports', imageUrl: '/images/sports.png' },
    { title: 'Science', imageUrl: '/images/science.png' },
    { title: 'Surprise Me', imageUrl: '/images/surpriseme.png' },
  ];

  const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' , width: '100wh' }}>
    <Grid container spacing={5}>
      {cardData.map((card) => (
        <Grid item xs={12} sm={4} md={4} key={card.title}>
          {buildCard(card)}
        </Grid>
      ))}
    </Grid>
  </Container>
  );
};

export default QuizCategories;


