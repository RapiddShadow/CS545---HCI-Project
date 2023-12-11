import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogTitle, DialogContent, DialogActions, Grid} from '@material-ui/core';
import QuizResult from './QuizResult';

const questionsData = [
  {
      "category": "Mixed",
      "question": "What traditional Japanese performance art combines singing, acting, and dancing?",
      "options": ["Kabuki", "Samba", "Ballet", "Flamenco"],
      "correct_answer": "Kabuki",
      "difficulty": 1,
      "hint": "In this Japanese art form, performers wear elaborate costumes and use exaggerated gestures to tell stories on stage."
  },
  {
      "category": "Mixed",
      "question": "Which country is famous for its colorful and intricate pottery known as 'Delftware'?",
      "options": ["Italy", "Spain", "Netherlands", "France"],
      "correct_answer": "Netherlands",
      "difficulty": 2,
      "hint": "The pottery from this European country is known for its blue and white designs, depicting scenes from daily life."
  },
  {
      "category": "Mixed",
      "question": "What Italian dish consists of thinly sliced raw meat or fish, typically served as an appetizer?",
      "options": ["Sushi", "Bruschetta", "Carpaccio", "Paella"],
      "correct_answer": "Carpaccio",
      "difficulty": 3,
      "hint": "This dish, named after a Venetian painter, offers a delightful way to enjoy raw meat or fish with flavorful accompaniments."
  },
  {
      "category": "Mixed",
      "question": "In which country did the Renaissance, a period of great cultural and artistic achievement, originate?",
      "options": ["France", "Greece", "Italy", "Spain"],
      "correct_answer": "Italy",
      "difficulty": 4,
      "hint": "During this historical period, Italy became a hub of creativity, witnessing the works of artists like Leonardo da Vinci and Michelangelo."
  },
  {
      "category": "Mixed",
      "question": "Which South American dance style originated in the working-class neighborhoods of Buenos Aires?",
      "options": ["Salsa", "Tango", "Rumba", "Flamenco"],
      "correct_answer": "Tango",
      "difficulty": 5,
      "hint": "This passionate and intricate dance form has its roots in the vibrant neighborhoods of Argentina's capital city."
  },
  {
      "category": "Mixed",
      "question": "Who is the famous playwright known for works like 'Romeo and Juliet' and 'Hamlet'?",
      "options": ["William Wordsworth", "Charles Dickens", "William Shakespeare", "George Orwell"],
      "correct_answer": "William Shakespeare",
      "difficulty": 6,
      "hint": "This literary genius from the Elizabethan era crafted timeless plays that continue to captivate audiences worldwide."
  },
  {
      "category": "Mixed",
      "question": "What is the traditional percussion instrument of India, consisting of two hand-played drums?",
      "options": ["Sitar", "Tabla", "Didgeridoo", "Bagpipes"],
      "correct_answer": "Tabla",
      "difficulty": 7,
      "hint": "These drums are an integral part of Indian classical music, producing rhythmic beats that accompany various musical compositions."
  },
  {
      "category": "Mixed",
      "question": "Who is the author of the epic Indian text, the 'Mahabharata'?",
      "options": ["Rabindranath Tagore", "Kalidasa", "Vyasa", "Valmiki"],
      "correct_answer": "Vyasa",
      "difficulty": 8,
      "hint": "Attributed to this ancient sage, the 'Mahabharata' is an epic poem that narrates the Kurukshetra War and includes the Bhagavad Gita."
  },
  {
      "category": "Mixed",
      "question": "What style of art, known for its use of geometric shapes and primary colors, was pioneered by Piet Mondrian?",
      "options": ["Cubism", "Surrealism", "Abstract Art", "Impressionism"],
      "correct_answer": "Abstract Art",
      "difficulty": 9,
      "hint": "This art movement emphasizes simplicity and clarity, with artists like Mondrian creating compositions with bold lines and colors."
  },
  {
      "category": "Mixed",
      "question": "Which country is famous for its traditional Maasai warrior dances and distinctive beaded jewelry?",
      "options": ["Kenya", "Egypt", "Nigeria", "Morocco"],
      "correct_answer": "Kenya",
      "difficulty": 10,
      "hint": "The vibrant cultural heritage of this African nation includes dynamic warrior dances and intricate beadwork."
  }
];

const SurpriseQuizCard = () => {
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
  };

  const updateScoreOnBackend = async (score) => {
    console.log(score)
    try {

      const updatedUserData = { ...userData, Surprise_score: score };
    // Store the updated user data in session storage
    sessionStorage.setItem('token', JSON.stringify(updatedUserData));
      const response = await axios.patch('http://localhost:4000/userprofile/update-score',  {id: userData._id, score: score, category :'Surprise_score'});
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

  export default SurpriseQuizCard;