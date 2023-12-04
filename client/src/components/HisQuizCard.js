import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Card, CardContent, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

const questionsData = [
    {
        "category": "History",
        "question": "Who is credited with discovering America in 1492?",
        "options": ["Christopher Columbus", "Marco Polo", "Ferdinand Magellan", "Vasco da Gama"],
        "correct_answer": "Christopher Columbus",
        "difficulty": 1
    },
    {
        "category": "History",
        "question": "In which war did the Battle of Gettysburg take place?",
        "options": ["American Revolutionary War", "World War I", "American Civil War", "War of 1812"],
        "correct_answer": "American Civil War",
        "difficulty": 2
    },
    {
        "category": "History",
        "question": "Who was the first President of the United States?",
        "options": ["Benjamin Franklin", "George Washington", "Thomas Jefferson", "John Adams"],
        "correct_answer": "George Washington",
        "difficulty": 3
    },
    {
        "category": "History",
        "question": "Which famous Egyptian queen was known for her relationships with Julius Caesar and Mark Antony?",
        "options": ["Cleopatra", "Nefertiti", "Hatshepsut", "Ankhesenamun"],
        "correct_answer": "Cleopatra",
        "difficulty": 4
    },
    {
        "category": "History",
        "question": "The Magna Carta, signed in 1215, is often considered a cornerstone of which political concept?",
        "options": ["Democracy", "Communism", "Fascism", "Monarchy"],
        "correct_answer": "Democracy",
        "difficulty": 5
    },
    {
        "category": "History",
        "question": "Who wrote the Communist Manifesto with Karl Marx in 1848?",
        "options": ["Friedrich Engels", "Vladimir Lenin", "Leon Trotsky", "Joseph Stalin"],
        "correct_answer": "Friedrich Engels",
        "difficulty": 6
    },
    {
        "category": "History",
        "question": "Which ancient wonder of the world was a colossal statue of the Greek sun-god Helios?",
        "options": ["Hanging Gardens of Babylon", "Colossus of Rhodes", "Great Pyramid of Giza", "Temple of Artemis at Ephesus"],
        "correct_answer": "Colossus of Rhodes",
        "difficulty": 7
    },
    {
        "category": "History",
        "question": "Who was the longest-reigning monarch in British history?",
        "options": ["Queen Elizabeth II", "Queen Victoria", "Queen Mary", "King Henry VIII"],
        "correct_answer": "Queen Elizabeth II",
        "difficulty": 8
    },
    {
        "category": "History",
        "question": "What year did the Berlin Wall fall, leading to the reunification of East and West Germany?",
        "options": ["1989", "1991", "1993", "1987"],
        "correct_answer": "1989",
        "difficulty": 9
    },
    {
        "category": "History",
        "question": "Who was the leader of the Soviet Union during the Cuban Missile Crisis?",
        "options": ["Vladimir Putin", "Mikhail Gorbachev", "Joseph Stalin", "Nikita Khrushchev"],
        "correct_answer": "Nikita Khrushchev",
        "difficulty": 10
    }
];


const HisQuizCard = () => {
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

export default HisQuizCard;