import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogTitle, DialogContent, DialogActions, Grid} from '@material-ui/core';
import QuizResult from './QuizResult';

const questionsData = [
  {
      "category": "Geography",
      "question": "Which continent is home to the Sahara Desert?",
      "options": ["Asia", "Africa", "South America", "Europe"],
      "correct_answer": "Africa",
      "difficulty": 1,
      "hint": "Think of the vast desert that covers much of the northern part of this continent."
  },
  {
      "category": "Geography",
      "question": "What is the capital city of France?",
      "options": ["Berlin", "Madrid", "Paris", "Rome"],
      "correct_answer": "Paris",
      "difficulty": 2,
      "hint": "The city known for its romantic ambiance, iconic Eiffel Tower, and delicious pastries."
  },
  {
      "category": "Geography",
      "question": "Which river is the longest in the world?",
      "options": ["Paris", "Amazon", "Mississippi", "Yangtze"],
      "correct_answer": "Amazon",
      "difficulty": 3,
      "hint": "This river flows through a rainforest and is a primary waterway in South America."
  },
  {
      "category": "Geography",
      "question": "Which country is known as the Land of the Rising Sun?",
      "options": ["China", "Japan", "India", "South Korea"],
      "correct_answer": "Japan",
      "difficulty": 4,
      "hint": "Look to the east, where the sun rises, to find this island nation."
  },
  {
      "category": "Geography",
      "question": "In which country would you find the ancient city of Machu Picchu?",
      "options": ["Peru", "Mexico", "Egypt", "Greece"],
      "correct_answer": "Peru",
      "difficulty": 5,
      "hint": "Explore the Andes mountains to discover the ruins of this ancient Incan city."
  },
  {
      "category": "Geography",
      "question": "What is the highest mountain peak in North America?",
      "options": ["Kilimanjaro", "Everest", "Denali", "Fuji"],
      "correct_answer": "Denali",
      "difficulty": 6,
      "hint": "This towering peak can be found in the state of Alaska, USA."
  },
  {
      "category": "Geography",
      "question": "Which African country is the most populous?",
      "options": ["Nigeria", "Egypt", "South Africa", "Ethiopia"],
      "correct_answer": "Nigeria",
      "difficulty": 7,
      "hint": "This West African nation has a large and diverse population."
  },
  {
      "category": "Geography",
      "question": "What is the largest ocean on Earth?",
      "options": ["Atlantic", "Indian", "Pacific", "Arctic"],
      "correct_answer": "Pacific",
      "difficulty": 8,
      "hint": "Think of the vast expanse of water covering much of the Earth's surface to the west of the Americas and east of Asia."
  },
  {
      "category": "Geography",
      "question": "Which two countries share the longest international border in the world?",
      "options": ["Russia and China", "Canada and the United States", "India and Pakistan", "Brazil and Argentina"],
      "correct_answer": "Canada and the United States",
      "difficulty": 9,
      "hint": "These North American neighbors share a long boundary, including natural wonders like Niagara Falls."
  },
  {
      "category": "Geography",
      "question": "Which city stands at the crossroads of Europe and Asia and is known as the Eurasian city?",
      "options": ["Istanbul", "Moscow", "Dubai", "Tehran"],
      "correct_answer": "Istanbul",
      "difficulty": 10,
      "hint": "This city, formerly known as Byzantium and later as Constantinople, is a transcontinental city straddling both Europe and Asia."
  }
];

const GeoQuizCard = () => {
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

      const updatedUserData = { ...userData, Geo_score: score };
    // Store the updated user data in session storage
    sessionStorage.setItem('token', JSON.stringify(updatedUserData));
      const response = await axios.patch('http://localhost:4000/userprofile/update-score',  {id: userData._id, score: score, category :'Geo_score'});
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

  export default GeoQuizCard;