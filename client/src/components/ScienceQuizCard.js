import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

const questionsData = [
    {
        "category": "Science",
        "question": "What is the process by which plants use sunlight to convert carbon dioxide and water into glucose and oxygen?",
        "options": ["Photosynthesis", "Respiration", "Fermentation", "Combustion"],
        "correct_answer": "Photosynthesis",
        "difficulty": 2
    },
    {
        "category": "Science",
        "question": "What is the closest star to Earth?",
        "options": ["Mars", "Venus", "The Sun", "Jupiter"],
        "correct_answer": "The Sun",
        "difficulty": 3
    },
    {
        "category": "Science",
        "question": "Who is considered the father of modern physics and is known for the theory of relativity?",
        "options": ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Niels Bohr"],
        "correct_answer": "Albert Einstein",
        "difficulty": 4
    },
    {
        "category": "Science",
        "question": "What is the smallest unit of matter?",
        "options": ["Proton", "Atom", "Electron", "Neutron"],
        "correct_answer": "Atom",
        "difficulty": 5
    },
    {
        "category": "Science",
        "question": "Which gas makes up the majority of Earth's atmosphere?",
        "options": ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        "correct_answer": "Nitrogen",
        "difficulty": 6
    },
    {
        "category": "Science",
        "question": "What is the process by which an organism evolves over generations through changes in its genetic material?",
        "options": ["Evolution", "Natural selection", "Adaptation", "Mutation"],
        "correct_answer": "Evolution",
        "difficulty": 7
    },
    {
        "category": "Science",
        "question": "What is the study of the Earth's past, including the history of life on Earth, called?",
        "options": ["Geology", "Paleontology", "Anthropology", "Archaeology"],
        "correct_answer": "Geology",
        "difficulty": 8
    },
    {
        "category": "Science",
        "question": "Which subatomic particles are found in the nucleus of an atom?",
        "options": ["Electrons", "Protons and neutrons", "Neutrons and electrons", "Protons and electrons"],
        "correct_answer": "Protons and neutrons",
        "difficulty": 9
    },
    {
        "category": "Science",
        "question": "What is the branch of science that deals with the study of the behavior of matter and energy at the atomic and subatomic level?",
        "options": ["Biology", "Chemistry", "Particle Physics", "Geology"],
        "correct_answer": "Particle Physics",
        "difficulty": 10
    }
];


const ScienceQuizCard = () => {
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
        
        {currentQuestion < questionsData.length ? (
              <Typography variant="body1" gutterBottom style={{ color: 'white' }}>
                Time Left: {seconds} seconds
              </Typography>
            ) : null}

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

export default ScienceQuizCard;