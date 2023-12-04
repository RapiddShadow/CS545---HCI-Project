import React, { useState } from 'react';
import { Card,  CardContent, CardMedia, Grid, Typography,  Container} from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';


const QuizCategories = ({ title }) => {

  React.useEffect(() => {
    document.title = title; // Set the page title
  }, [title]);

  const buildCard = (card) => (
    <Card key={card.title}>
      <NavLink to={card.quizLink}>
      <CardMedia component="img" alt={card.title} height="350" image={card.imageUrl} style={{ width: `${card.imageWidth}px`, height: `${card.imageHeight}px`, objectFit: 'cover' }}/>
      <CardContent>
        <Typography variant="h5" component="div">
          {card.title}
        </Typography>
      </CardContent>
      </NavLink>
    </Card>
  );

  const cardData = [
    { title: 'Pop Culture', imageUrl: "/images/popculture.png", quizLink: '/pop-quiz'},
    { title: 'Geography', imageUrl: '/images/geography.png', quizLink: '/geo-quiz' },
    { title: 'History', imageUrl: '/images/history.png', quizLink: '/his-quiz' },
    { title: 'Sports', imageUrl: '/images/sports.png', quizLink: '/sports-quiz' },
    { title: 'Science', imageUrl: '/images/science.png', quizLink: '/science-quiz' },
    { title: 'Surprise Me', imageUrl: '/images/surpriseme.png', quizLink: '/surprise-quiz' },
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


