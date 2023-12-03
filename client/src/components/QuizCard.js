import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';

const questionsData = [
    {
        "category": "Pop Culture",
        "question": "What animated film features a young lion named Simba?",
        "options": ["Aladdin", "The Lion King", "Frozen", "Finding Nemo"],
        "correct_answer": "The Lion King",
        "difficulty": 1
    },
    {
        "category": "Pop Culture",
        "question": "Who played the iconic character Jack Dawson in the movie 'Titanic'?",
        "options": ["Brad Pitt", "Tom Cruise", "Leonardo DiCaprio", "Johnny Depp"],
        "correct_answer": "Leonardo DiCaprio",
        "difficulty": 2
    },
    {
        "category": "Pop Culture",
        "question": "Which famous band is known for their album 'Abbey Road'?",
        "options": ["Pink Floyd", "Led Zeppelin", "The Rolling Stones", "The Beatles"],
        "correct_answer": "The Beatles",
        "difficulty": 3
    },
    {
        "category": "Pop Culture",
        "question": "In which TV series did characters like Walter White and Jesse Pinkman become infamous?",
        "options": ["Breaking Bad", "The Sopranos", "Game of Thrones", "Friends"],
        "correct_answer": "Breaking Bad",
        "difficulty": 4
    },
    {
        "category": "Pop Culture",
        "question": "Who is the author of the 'Harry Potter' series?",
        "options": ["J.R.R. Tolkien", "George R.R. Martin", "J.K. Rowling", "Suzanne Collins"],
        "correct_answer": "J.K. Rowling",
        "difficulty": 5
    },
    {
        "category": "Pop Culture",
        "question": "Which film won the Academy Award for Best Picture in 1994?",
        "options": ["Pulp Fiction", "Schindler's List", "Forrest Gump", "Goodfellas"],
        "correct_answer": "Forrest Gump",
        "difficulty": 6
    },
    {
        "category": "Pop Culture",
        "question": "What character is portrayed by Robert Downey Jr. in the Marvel Cinematic Universe?",
        "options": ["Thor", "Iron Man", "Captain America", "Black Widow"],
        "correct_answer": "Iron Man",
        "difficulty": 7
    },
    {
        "category": "Pop Culture",
        "question": "Who is the lead singer of the rock band U2?",
        "options": ["Bono", "Sting", "Mick Jagger", "Bruce Springsteen"],
        "correct_answer": "Bono",
        "difficulty": 8
    },
    {
        "category": "Pop Culture",
        "question": "In the film 'The Matrix,' what is the real name of the character played by Keanu Reeves?",
        "options": ["Neo", "Morpheus", "Trinity", "Cypher"],
        "correct_answer": "Neo",
        "difficulty": 9
    },
    {
        "category": "Pop Culture",
        "question": "Which famous pop star's real name is Stefani Joanne Angelina Germanotta?",
        "options": ["Madonna", "Katy Perry", "Lady Gaga", "Adele"],
        "correct_answer": "Lady Gaga",
        "difficulty": 10
    }
];

const QuizCard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isTimeOut, setTimeOut] = useState(false);
  const [seconds, setSeconds] = useState(75);

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
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedOption('');
  };

  const handleTimeout = () => {
    setTimeOut(true);
  };

  return (

    <div className="col-md-8 offset-2 align-items-center">
      <br /><br /><br></br>
      <div className="wsk-cp-matches ">

    <Card style={{
        background: 'navy', // Blue background
        color: 'white', // White text
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
              <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                {questionsData[currentQuestion].options.map((option, index) => (
                  <FormControlLabel key={index} value={option} control={<Radio style={{ color: 'white' }} />}  label={option} />
                ))}
              </RadioGroup>
              <br></br>
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
            <Button variant="contained" onClick={() => console.log('Submit:', selectedOption)}>
              Submit
            </Button>
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
    </div></div>
  );
};

export default QuizCard;