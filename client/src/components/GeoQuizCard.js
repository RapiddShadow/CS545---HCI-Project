import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Card, CardContent, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

const questionsData = [
    {
        "category": "Geography",
        "question": "Which continent is home to the Sahara Desert?",
        "options": ["Asia", "Africa", "South America", "Europe"],
        "correct_answer": "Africa",
        "difficulty": 1
    },
    {
        "category": "Geography",
        "question": "What is the capital city of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "correct_answer": "Paris",
        "difficulty": 2
    },
    {
        "category": "Geography",
        "question": "Which river is the longest in the world?",
        "options": ["Paris", "Amazon", "Mississippi", "Yangtze"],
        "correct_answer": "Amazon",
        "difficulty": 3
    },
    {
        "category": "Geography",
        "question": "Which country is known as the Land of the Rising Sun?",
        "options": ["China", "Japan", "India", "South Korea"],
        "correct_answer": "Japan",
        "difficulty": 4
    },
    {
        "category": "Geography",
        "question": "In which country would you find the ancient city of Machu Picchu?",
        "options": ["Peru", "Mexico", "Egypt", "Greece"],
        "correct_answer": "Peru",
        "difficulty": 5
    },
    {
        "category": "Geography",
        "question": "What is the highest mountain peak in North America?",
        "options": ["Kilimanjaro", "Everest", "Denali", "Fuji"],
        "correct_answer": "Denali",
        "difficulty": 6
    },
    {
        "category": "Geography",
        "question": "Which African country is the most populous?",
        "options": ["Nigeria", "Egypt", "South Africa", "Ethiopia"],
        "correct_answer": "Nigeria",
        "difficulty": 7
    },
    {
        "category": "Geography",
        "question": "What is the largest ocean on Earth?",
        "options": ["Atlantic", "Indian", "Pacific", "Arctic"],
        "correct_answer": "Pacific",
        "difficulty": 8
    },
    {
        "category": "Geography",
        "question": "Which two countries share the longest international border in the world?",
        "options": ["Russia and China", "Canada and the United States", "India and Pakistan", "Brazil and Argentina"],
        "correct_answer": "Canada and the United States",
        "difficulty": 9
    },
    {
        "category": "Geography",
        "question": "Which city stands at the crossroads of Europe and Asia and is known as the Eurasian city?",
        "options": ["Istanbul", "Moscow", "Dubai", "Tehran"],
        "correct_answer": "Istanbul",
        "difficulty": 10
    }
];


const GeoQuizCard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState('');
  const [isTimeOut, setTimeOut] = useState(false);
  const [seconds, setSeconds] = useState(75);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 900);
    if (seconds === 0) {
      clearInterval(interval);
      setTimeOut(true);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  const handleOptionChange = (event) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = event.target.value;
    setSelectedOptions(newSelectedOptions, () => {
      calculateScore();
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const calculateScore = () => {
    let userScore = 0;
    questionsData.forEach((question, index) => {
      if (selectedOptions[index] === question.correct_answer) {
        userScore += 10;
      }
    });
    setScore(userScore);
    setSelectedOptions(Array(questionsData.length).fill(''));
  };

  const handleSubmission = () => {
    calculateScore();
    setQuizCompleted(true);
    setOpenDialog(true);
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
        
        <Typography variant="body1" gutterBottom style={{ color: 'white' }}>
            Time Left: {seconds} seconds
        </Typography>

        <Typography variant="body1" gutterBottom style={{ color: 'white' }}>
            Hint 
        </Typography>


        {currentQuestion < questionsData.length ? (
          <>
            <Typography variant="h4" gutterBottom>
              {questionsData[currentQuestion].question}
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: 'white' }}></FormLabel>
              <RadioGroup value={selectedOptions[currentQuestion]} onChange={handleOptionChange}>
                {questionsData[currentQuestion].options.map((option, index) => (
                <FormControlLabel key={index} value={option} control={<Radio style={{ color: 'white' }} />}  label={option} />
                ))}
              </RadioGroup>
              {!isTimeOut && (
                <Button variant="contained" onClick={handleNextQuestion}>
                  Next Question
                </Button>
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
    </div></div>
  );
};

export default GeoQuizCard;