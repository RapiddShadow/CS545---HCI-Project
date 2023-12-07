import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

const questionsData = [
  {
      "category": "History",
      "question": "Who is credited with discovering America in 1492?",
      "options": ["Christopher Columbus", "Marco Polo", "Ferdinand Magellan", "Vasco da Gama"],
      "correct_answer": "Christopher Columbus",
      "difficulty": 1,
      "hint": "This explorer's famous journey across the Atlantic is often associated with the year 1492."
  },
  {
      "category": "History",
      "question": "In which war did the Battle of Gettysburg take place?",
      "options": ["American Revolutionary War", "World War I", "American Civil War", "War of 1812"],
      "correct_answer": "American Civil War",
      "difficulty": 2,
      "hint": "This pivotal battle occurred during a conflict that divided the United States in the 1860s."
  },
  {
      "category": "History",
      "question": "Who was the first President of the United States?",
      "options": ["Benjamin Franklin", "George Washington", "Thomas Jefferson", "John Adams"],
      "correct_answer": "George Washington",
      "difficulty": 3,
      "hint": "Often referred to as the 'Father of His Country,' he led the nation during its early years."
  },
  {
      "category": "History",
      "question": "Which famous Egyptian queen was known for her relationships with Julius Caesar and Mark Antony?",
      "options": ["Cleopatra", "Nefertiti", "Hatshepsut", "Ankhesenamun"],
      "correct_answer": "Cleopatra",
      "difficulty": 4,
      "hint": "This queen's love affairs with Roman leaders played a significant role in ancient history."
  },
  {
      "category": "History",
      "question": "The Magna Carta, signed in 1215, is often considered a cornerstone of which political concept?",
      "options": ["Democracy", "Communism", "Fascism", "Monarchy"],
      "correct_answer": "Democracy",
      "difficulty": 5,
      "hint": "This historic document laid the groundwork for a system of government that values the voice of the people."
  },
  {
      "category": "History",
      "question": "Who wrote the Communist Manifesto with Karl Marx in 1848?",
      "options": ["Friedrich Engels", "Vladimir Lenin", "Leon Trotsky", "Joseph Stalin"],
      "correct_answer": "Friedrich Engels",
      "difficulty": 6,
      "hint": "This collaborator of Karl Marx co-authored a foundational text for a political ideology."
  },
  {
      "category": "History",
      "question": "Which ancient wonder of the world was a colossal statue of the Greek sun-god Helios?",
      "options": ["Hanging Gardens of Babylon", "Colossus of Rhodes", "Great Pyramid of Giza", "Temple of Artemis at Ephesus"],
      "correct_answer": "Colossus of Rhodes",
      "difficulty": 7,
      "hint": "This massive statue once stood as a symbol of ancient craftsmanship and artistic achievement."
  },
  {
      "category": "History",
      "question": "Who was the longest-reigning monarch in British history?",
      "options": ["Queen Elizabeth II", "Queen Victoria", "Queen Mary", "King Henry VIII"],
      "correct_answer": "Queen Elizabeth II",
      "difficulty": 8,
      "hint": "This monarch has witnessed significant historical events during her reign."
  },
  {
      "category": "History",
      "question": "What year did the Berlin Wall fall, leading to the reunification of East and West Germany?",
      "options": ["1989", "1991", "1993", "1987"],
      "correct_answer": "1989",
      "difficulty": 9,
      "hint": "The fall of this barrier marked a symbolic end to the Cold War and a reunification era."
  },
  {
      "category": "History",
      "question": "Who was the leader of the Soviet Union during the Cuban Missile Crisis?",
      "options": ["Vladimir Putin", "Mikhail Gorbachev", "Joseph Stalin", "Nikita Khrushchev"],
      "correct_answer": "Nikita Khrushchev",
      "difficulty": 10,
      "hint": "This Soviet leader's decisions during a tense period of the Cold War impacted global politics."
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
  const [userData, setUserData] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

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

      const updatedUserData = { ...userData, Hist_score: score };
    // Store the updated user data in session storage
    sessionStorage.setItem('token', JSON.stringify(updatedUserData));
      const response = await axios.patch('http://localhost:4000/userprofile/update-score',  {id: userData._id, score: score, category :'Hist_score'});
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
            <Button variant="contained" onClick={handleHintButtonClick}>
              Show Hint
            </Button>
        )}


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

export default HisQuizCard;