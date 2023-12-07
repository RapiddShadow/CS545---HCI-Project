import React, { useState } from 'react';
import { Card,  CardContent, CardMedia, Grid, Typography,  Container} from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import '../App.css';


const QuizCategories = ({ title }) => {

  React.useEffect(() => {
    document.title = title; // Set the page title
  }, [title]);

  const buildCard = (card) => (
    <Card key={card.title} style={{ width: '100%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
      <NavLink to={card.quizLink}>
        <CardMedia
          component="img"
          alt={card.title}
          image={card.imageUrl}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h5" component="div" style={{color: "black"}}>
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
    <>
      <div style={{ marginTop: '20px' }} /> {/* Add space above the Container */}
      <Container className style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid container spacing={5}>
          {cardData.map((card) => (
            <Grid item xs={12} sm={4} md={4} key={card.title}>
              {buildCard(card)}
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
  
};

export default QuizCategories;