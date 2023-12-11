import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogTitle, DialogContent, DialogActions, Grid} from '@material-ui/core';
import QuizResult from './QuizResult';

const questionsData = [
  {
      "category": "Sports",
      "question": "In which sport do players try to score goals by hitting a puck into the opposing team's net?",
      "options": ["Basketball", "Soccer", "Ice Hockey", "Tennis"],
      "correct_answer": "Ice Hockey",
      "difficulty": 1,
      "hint": "This sport is played on an ice rink, and the players use sticks to hit a small object into the opponent's net."
  },
  {
      "category": "Sports",
      "question": "How many players are there on a standard soccer team, including the goalkeeper?",
      "options": ["9", "11", "7", "6"],
      "correct_answer": "11",
      "difficulty": 2,
      "hint": "A standard soccer team has the same number of players as the traditional number of players on a cricket team."
  },
  {
      "category": "Sports",
      "question": "What is the highest possible score in a single frame of bowling?",
      "options": ["100", "200", "300", "400"],
      "correct_answer": "300",
      "difficulty": 3,
      "hint": "Achieving this perfect score requires knocking down all ten pins with each throw in a frame."
  },
  {
      "category": "Sports",
      "question": "Which country won the FIFA World Cup in 2018?",
      "options": ["Brazil", "Germany", "France", "Italy"],
      "correct_answer": "France",
      "difficulty": 4,
      "hint": "The host nation of this World Cup celebrated victory, lifting the trophy for the second time in their history."
  },
  {
      "category": "Sports",
      "question": "Which tennis player has won the most Grand Slam singles titles in history?",
      "options": ["Serena Williams", "Rafael Nadal", "Roger Federer", "Novak Djokovic"],
      "correct_answer": "Novak Djokovic",
      "difficulty": 5,
      "hint": "This player hails from Serbia and has been a dominant force in men's tennis in recent years."
  },
  {
      "category": "Sports",
      "question": "What is the object of the game in curling?",
      "options": ["To score goals", "To knock down all the pins", "To slide stones on ice towards a target", "To shoot a puck into the opponent's net"],
      "correct_answer": "To slide stones on ice towards a target",
      "difficulty": 6,
      "hint": "This winter sport involves strategically sliding stones on ice towards a circular target area."
  },
  {
      "category": "Sports",
      "question": "Which American sprinter famously won four gold medals at the 1936 Berlin Olympics?",
      "options": ["Jesse Owens", "Usain Bolt", "Carl Lewis", "Michael Johnson"],
      "correct_answer": "Jesse Owens",
      "difficulty": 7,
      "hint": "Despite facing adversity, this athlete's achievements at the 1936 Olympics made history and challenged racial prejudices."
  },
  {
      "category": "Sports",
      "question": "Who holds the record for the most career home runs in Major League Baseball?",
      "options": ["Babe Ruth", "Barry Bonds", "Hank Aaron", "Willie Mays"],
      "correct_answer": "Barry Bonds",
      "difficulty": 8,
      "hint": "This former MLB player holds the record for the most home runs in a career, surpassing the legendary Babe Ruth."
  },
  {
      "category": "Sports",
      "question": "In which sport can you perform a 'corkscrew' or '720' as part of a routine?",
      "options": ["Snowboarding", "Figure skating", "Gymnastics", "Diving"],
      "correct_answer": "Snowboarding",
      "difficulty": 9,
      "hint": "This sport involves descending down a snow-covered slope on a board, and tricks like 'corkscrew' are part of the excitement."
  },
  {
      "category": "Sports",
      "question": "Which country hosted the 2016 Summer Olympics?",
      "options": ["Australia", "Brazil", "Canada", "South Africa"],
      "correct_answer": "Brazil",
      "difficulty": 10,
      "hint": "The vibrant city of Rio de Janeiro in this South American country was the host for the 2016 Summer Olympics."
  }
];

const SportsQuizCard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(questionsData.length).fill(''));
  const [isTimeOut, setTimeOut] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [userData, setUserData] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
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
    }, 1000);

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
    const questionIndex = currentQuestion;
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = event.target.value;
    setSelectedOptions(newSelectedOptions, () => {
      calculateScore();
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setAnimationReset(true)
    setTimeout(() => {
      setAnimationReset(false)
    }, 0);
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
  };

  const updateScoreOnBackend = async (score) => {
    console.log(score)
    try {

      const updatedUserData = { ...userData, Sport_score: score };
    // Store the updated user data in session storage
    sessionStorage.setItem('token', JSON.stringify(updatedUserData));
      const response = await axios.patch('http://localhost:4000/userprofile/update-score',  {id: userData._id, score: score, category :'Sport_score'});
      console.log('Score updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const handleSubmission = () => {
    calculateScore();
    setQuizCompleted(true);
    setQuizSubmitted(true);
    setShowResult(true);
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
              <Button variant="outlined" size="small" onClick={handleSubmission} className="quizButton">
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
              <Button variant="outlined" size="small" onClick={handleTimeout} className="quizButton">
                Back to the Main Page
              </Button>
          </div>
        )}
      </CardContent>
    </Card>
    <Dialog open={showHint} onClose={handleCloseHintDialog}>
          <DialogTitle>Hint</DialogTitle>
          <DialogContent>
            {questionsData[currentQuestion]?.hint ||
              'No hint available.'}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseHintDialog}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {quizCompleted && (
          <QuizResult
            questionsData={questionsData}
            selectedOptions={selectedOptions}
            score={score}
          />
        )}
    </div></div>
  );
  };

  export default SportsQuizCard;