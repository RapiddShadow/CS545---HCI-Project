import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogTitle, DialogContent, DialogActions, Grid} from '@material-ui/core';

const questionsData = [
  {
      "category": "Pop Culture",
      "question": "What animated film features a young lion named Simba?",
      "options": ["Aladdin", "The Lion King", "Frozen", "Finding Nemo"],
      "correct_answer": "The Lion King",
      "difficulty": 1,
      "hint": "This film is a classic Disney animation involving the circle of life."
  },
  {
      "category": "Pop Culture",
      "question": "Who played the iconic character Jack Dawson in the movie 'Titanic'?",
      "options": ["Brad Pitt", "Tom Cruise", "Leonardo DiCaprio", "Johnny Depp"],
      "correct_answer": "Leonardo DiCaprio",
      "difficulty": 2,
      "hint": "This actor is known for his captivating performances and finally won an Oscar for 'The Revenant.'"
  },
  {
      "category": "Pop Culture",
      "question": "Which famous band is known for their album 'Abbey Road'?",
      "options": ["Pink Floyd", "Led Zeppelin", "The Rolling Stones", "The Beatles"],
      "correct_answer": "The Beatles",
      "difficulty": 3,
      "hint": "This iconic band from the 60s is often associated with peace and love, and this album's cover is a famous zebra crossing."
  },
  {
      "category": "Pop Culture",
      "question": "In which TV series did characters like Walter White and Jesse Pinkman become infamous?",
      "options": ["Breaking Bad", "The Sopranos", "Game of Thrones", "Friends"],
      "correct_answer": "Breaking Bad",
      "difficulty": 4,
      "hint": "This critically acclaimed series follows the transformation of a chemistry teacher into a drug kingpin."
  },
  {
      "category": "Pop Culture",
      "question": "Who is the author of the 'Harry Potter' series?",
      "options": ["J.R.R. Tolkien", "George R.R. Martin", "J.K. Rowling", "Suzanne Collins"],
      "correct_answer": "J.K. Rowling",
      "difficulty": 5,
      "hint": "The magical world of Hogwarts was brought to life by this British author."
  },
  {
      "category": "Pop Culture",
      "question": "Which film won the Academy Award for Best Picture in 1994?",
      "options": ["Pulp Fiction", "Schindler's List", "Forrest Gump", "Goodfellas"],
      "correct_answer": "Forrest Gump",
      "difficulty": 6,
      "hint": "Life is like a box of chocolates in this heartwarming film starring Tom Hanks."
  },
  {
      "category": "Pop Culture",
      "question": "What character is portrayed by Robert Downey Jr. in the Marvel Cinematic Universe?",
      "options": ["Thor", "Iron Man", "Captain America", "Black Widow"],
      "correct_answer": "Iron Man",
      "difficulty": 7,
      "hint": "This superhero genius is known for donning a high-tech suit of armor."
  },
  {
      "category": "Pop Culture",
      "question": "Who is the lead singer of the rock band U2?",
      "options": ["Bono", "Sting", "Mick Jagger", "Bruce Springsteen"],
      "correct_answer": "Bono",
      "difficulty": 8,
      "hint": "This Irish rock band's charismatic frontman goes by a one-word stage name."
  },
  {
      "category": "Pop Culture",
      "question": "In the film 'The Matrix,' what is the real name of the character played by Keanu Reeves?",
      "options": ["Neo", "Morpheus", "Trinity", "Cypher"],
      "correct_answer": "Neo",
      "difficulty": 9,
      "hint": "This character is often referred to as 'The One' in a dystopian world controlled by machines."
  },
  {
      "category": "Pop Culture",
      "question": "Which famous pop star's real name is Stefani Joanne Angelina Germanotta?",
      "options": ["Madonna", "Katy Perry", "Lady Gaga", "Adele"],
      "correct_answer": "Lady Gaga",
      "difficulty": 10,
      "hint": "This eccentric pop sensation is known for her unique fashion sense and chart-topping hits."
  }
];

const PopQuizCard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState('');
  const [isTimeOut, setTimeOut] = useState(false);
  const [seconds, setSeconds] = useState(75);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [userData, setUserData] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [animationReset, setAnimationReset] = useState(false)

  const handleHintButtonClick = () => {
    setShowHint(true);
  };

  const handleCloseHintDialog = () => {
    setShowHint(false);
  };


  useEffect(() => {
    // Retrieve user data from session
    const storedUserData = sessionStorage.getItem('token');
    console.log(storedUserData)
    
    if (storedUserData) {
      // Parse the stored data
      const parsedUserData = JSON.parse(storedUserData);
      console.log(parsedUserData)
      setUserData(parsedUserData);
    }
  }, []);

  useEffect(() => {
    resetTimer();
  }, [currentQuestion]);

  useEffect(() => {
    if (score > 0) {
      // Now that the state has been updated, call the backend update function
      updateScoreOnBackend(score);
    }
  }, [score]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!quizSubmitted) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 900);

    if (seconds === 0) {
      clearInterval(interval);
      setTimeOut(true);
    }

    return () => clearInterval(interval);
  }, [seconds, quizSubmitted]);

  const resetTimer = () => {
    setSeconds(60);
    setTimeOut(false);
  };
  
  const handleOptionChange = (event) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = event.target.value;
    setSelectedOptions(newSelectedOptions, () => {
      calculateScore();
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setAnimationReset(true)
    setTimeout(() => {
      setAnimationReset(false)
    }, 100);
  };

  const calculateScore = () => {
    let userScore = 0;
    questionsData.forEach((question, index) => {
      if (selectedOptions[index] === question.correct_answer) {
        userScore += 10;
      }
    });
    // setScore(userScore);
    setScore(userScore, () => {
      // Now that the state has been updated, call the backend update function
      updateScoreOnBackend(userScore);
    });
    setSelectedOptions(Array(questionsData.length).fill(''));
  };

  const updateScoreOnBackend = async (score) => {
    console.log(score)
    try {

      const updatedUserData = { ...userData, Pop_score: score };
    // Store the updated user data in session storage
    sessionStorage.setItem('token', JSON.stringify(updatedUserData));
      const response = await axios.patch('http://localhost:4000/userprofile/update-score',  {id: userData._id, score: score, category :'Pop_score'});
      console.log('Score updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const handleSubmission = () => {
    calculateScore();
    setQuizCompleted(true);
    setOpenDialog(true);
    setQuizSubmitted(true);
  };

  const handleTimeout = () => {
    setTimeOut(true);
    window.location.href = '/categories';
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (

    <div className="col-md-8 offset-2 align-items-center">
      <br /><br /><br></br>
      <div className="wsk-cp-matches ">

    <Card style={{
        background: 'navy',
        color: 'white',
      }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Quiz
        </Typography>
        
        {currentQuestion < questionsData.length ? (
              <Typography variant="body1" gutterBottom style={{ color: 'white' }}>
                Time Left: {seconds} seconds
              </Typography>
            ) : null}
             {currentQuestion < questionsData.length && (
            <div className='progress'>
                    <div className={`progress-completed ${animationReset ? 'reset-animation':''}` } onAnimationEnd = {() => setAnimationReset(false)}></div>
                  </div>
                  )}
        {currentQuestion < questionsData.length && (
            <>
            <Box marginTop={3} marginBottom={3}> 
            <Button variant="outlined" size="small" onClick={handleHintButtonClick} className="quizButton">
              Show Hint
            </Button>
            </Box>
               </>
        )}

        {currentQuestion < questionsData.length ? (
          <>
            
            <Typography variant="h5" gutterBottom>
                {questionsData[currentQuestion].question}
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: 'white' }}></FormLabel>
                <RadioGroup value={selectedOptions[currentQuestion]} onChange={handleOptionChange}>
                    <Grid container spacing={2}>
                          {questionsData[currentQuestion].options.map((option, index) => (
                            <Grid item xs={6} key={index}>
                              <Box className='boxCSS'>
                                <FormControlLabel
                                  value={option}
                                  control={<Radio style={{ color: 'rgba(255, 255, 255, 0.2)' }} />}
                                  label={option}
                                />
                              </Box>
                            </Grid>
                          ))}
                   </Grid>
                </RadioGroup>
              {!isTimeOut && (
                 <>
                 <Box marginTop={3} marginBottom={3}> 
                   <Button variant="outlined" size="small" onClick={handleNextQuestion} className="quizButton" >
                     Next Question
                   </Button>
                 </Box>
               </>
              )}
            </FormControl>
            </>
        ) : (
          <div>
            <Typography variant="h6" gutterBottom>
              Quiz Completed!
            </Typography>
            {!quizCompleted && (
              <Button variant="contained" onClick={handleSubmission}>
                Submit
              </Button>
            )}
          </div>
        )}
        {isTimeOut && (
          <div>
            <Typography variant="h6" gutterBottom>
              Time's up!
            </Typography>
            <Button variant="contained" onClick={handleTimeout}>
                Back to the Main Page
              </Button>
          </div>
        )}
      </CardContent>
    </Card>
    <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Your Score</DialogTitle>
        <DialogContent>Congratulations! You have completed the quiz. Your score is: {score}</DialogContent>
        <DialogActions>
          <Button onClick={handleTimeout} color="primary">
            Back to the Main Page
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showHint} onClose={handleCloseHintDialog}>
        <DialogTitle>Hint</DialogTitle>
        <DialogContent>
          {questionsData[currentQuestion]?.hint || 'No hint available.'}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseHintDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div></div>
  );
  };

  export default PopQuizCard;