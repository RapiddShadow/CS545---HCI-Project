import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Card, CardContent, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

const questionsData = [
    {
        "category": "Sports",
        "question": "In which sport do players try to score goals by hitting a puck into the opposing team's net?",
        "options": ["Basketball", "Soccer", "Ice Hockey", "Tennis"],
        "correct_answer": "Ice Hockey",
        "difficulty": 1
    },
    {
        "category": "Sports",
        "question": "How many players are there on a standard soccer team, including the goalkeeper?",
        "options": ["9", "11", "7", "6"],
        "correct_answer": "11",
        "difficulty": 2
    },
    {
        "category": "Sports",
        "question": "What is the highest possible score in a single frame of bowling?",
        "options": ["100", "200", "300", "400"],
        "correct_answer": "300",
        "difficulty": 3
    },
    {
        "category": "Sports",
        "question": "Which country won the FIFA World Cup in 2018?",
        "options": ["Brazil", "Germany", "France", "Italy"],
        "correct_answer": "France",
        "difficulty": 4
    },
    {
        "category": "Sports",
        "question": "Which tennis player has won the most Grand Slam singles titles in history?",
        "options": ["Serena Williams", "Rafael Nadal", "Roger Federer", "Novak Djokovic"],
        "correct_answer": "Novak Djokovic",
        "difficulty": 5
    },
    {
        "category": "Sports",
        "question": "What is the object of the game in curling?",
        "options": ["To score goals", "To knock down all the pins", "To slide stones on ice towards a target", "To shoot a puck into the opponent's net"],
        "correct_answer": "To slide stones on ice towards a target",
        "difficulty": 6
    },
    {
        "category": "Sports",
        "question": "Which American sprinter famously won four gold medals at the 1936 Berlin Olympics?",
        "options": ["Jesse Owens", "Usain Bolt", "Carl Lewis", "Michael Johnson"],
        "correct_answer": "Jesse Owens",
        "difficulty": 7
    },
    {
        "category": "Sports",
        "question": "Who holds the record for the most career home runs in Major League Baseball?",
        "options": ["Babe Ruth", "Barry Bonds", "Hank Aaron", "Willie Mays"],
        "correct_answer": "Barry Bonds",
        "difficulty": 8
    },
    {
        "category": "Sports",
        "question": "In which sport can you perform a 'corkscrew' or '720' as part of a routine?",
        "options": ["Snowboarding", "Figure skating", "Gymnastics", "Diving"],
        "correct_answer": "Snowboarding",
        "difficulty": 9
    },
    {
        "category": "Sports",
        "question": "Which country hosted the 2016 Summer Olympics?",
        "options": ["Australia", "Brazil", "Canada", "South Africa"],
        "correct_answer": "Brazil",
        "difficulty": 10
    }
];


const SportsQuizCard = () => {
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

export default SportsQuizCard;