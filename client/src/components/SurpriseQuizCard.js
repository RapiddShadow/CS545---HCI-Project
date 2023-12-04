import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Card, CardContent, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

const questionsData = [
    {
        "category": "Mixed",
        "question": "What traditional Japanese performance art combines singing, acting, and dancing?",
        "options": ["Kabuki", "Samba", "Ballet", "Flamenco"],
        "correct_answer": "Kabuki",
        "difficulty": 1
    },
    {
        "category": "Mixed",
        "question": "Which country is famous for its colorful and intricate pottery known as 'Delftware'?",
        "options": ["Italy", "Spain", "Netherlands", "France"],
        "correct_answer": "Netherlands",
        "difficulty": 2
    },
    {
        "category": "Mixed",
        "question": "What Italian dish consists of thinly sliced raw meat or fish, typically served as an appetizer?",
        "options": ["Sushi", "Bruschetta", "Carpaccio", "Paella"],
        "correct_answer": "Carpaccio",
        "difficulty": 3
    },
    {
        "category": "Mixed",
        "question": "In which country did the Renaissance, a period of great cultural and artistic achievement, originate?",
        "options": ["France", "Greece", "Italy", "Spain"],
        "correct_answer": "Italy",
        "difficulty": 4
    },
    {
        "category": "Mixed",
        "question": "Which South American dance style originated in the working-class neighborhoods of Buenos Aires?",
        "options": ["Salsa", "Tango", "Rumba", "Flamenco"],
        "correct_answer": "Tango",
        "difficulty": 5
    },
    {
        "category": "Mixed",
        "question": "Who is the famous playwright known for works like 'Romeo and Juliet' and 'Hamlet'?",
        "options": ["William Wordsworth", "Charles Dickens", "William Shakespeare", "George Orwell"],
        "correct_answer": "William Shakespeare",
        "difficulty": 6
    },
    {
        "category": "Mixed",
        "question": "What is the traditional percussion instrument of India, consisting of two hand-played drums?",
        "options": ["Sitar", "Tabla", "Didgeridoo", "Bagpipes"],
        "correct_answer": "Tabla",
        "difficulty": 7
    },
    {
        "category": "Mixed",
        "question": "Who is the author of the epic Indian text, the 'Mahabharata'?",
        "options": ["Rabindranath Tagore", "Kalidasa", "Vyasa", "Valmiki"],
        "correct_answer": "Vyasa",
        "difficulty": 8
    },
    {
        "category": "Mixed",
        "question": "What style of art, known for its use of geometric shapes and primary colors, was pioneered by Piet Mondrian?",
        "options": ["Cubism", "Surrealism", "Abstract Art", "Impressionism"],
        "correct_answer": "Abstract Art",
        "difficulty": 9
    },
    {
        "category": "Mixed",
        "question": "Which country is famous for its traditional Maasai warrior dances and distinctive beaded jewelry?",
        "options": ["Kenya", "Egypt", "Nigeria", "Morocco"],
        "correct_answer": "Kenya",
        "difficulty": 10
    }
];


const SurpriseQuizCard = () => {
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

export default SurpriseQuizCard;