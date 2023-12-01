import React, { useState } from 'react';
import { Card,  CardContent, CardMedia, Grid, Typography,  Container} from '@material-ui/core';
import '../App.css';


const QuizCategories = ({ title }) => {

  React.useEffect(() => {
    document.title = title; // Set the page title
  }, [title]);

  const buildCard = (card) => (
    <Card key={card.title}>
      <CardMedia component="img" alt={card.title} height="140" image={card.imageUrl} />
      <CardContent>
        <Typography variant="h5" component="div">
          {card.title}
        </Typography>
      </CardContent>
    </Card>
  );



  const cardData = [
    { title: 'Pop Culture', imageUrl: "/images/popculture.png" },
    { title: 'Geography', imageUrl: '/images/geography.jpg' },
    { title: 'History', imageUrl: '/images/history.jpg' },
    { title: 'Sports', imageUrl: '/images/sports.jpg' },
    { title: 'Science', imageUrl: '/images/science.jpg' },
    { title: 'Surprise Me', imageUrl: '/images/surpriseme.jpg' },
  ];

  const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' , width: '100vh' }}>
    <Grid container spacing={3}>
      {cardData.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.title}>
          {buildCard(card)}
        </Grid>
      ))}
    </Grid>
  </Container>
  );
};

export default QuizCategories;


