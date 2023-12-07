import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, colors } from '@material-ui/core';

const handleMain = () => {
  window.location.href = '/categories';
}

const QuizResult = ({ questionsData, selectedOptions, score }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ color: 'black', fontWeight: 'bold' }}>Question</TableCell>
            <TableCell style={{ color: 'black', fontWeight: 'bold' }}>Correct Answer</TableCell>
            <TableCell style={{ color: 'black', fontWeight: 'bold' }}>Selected Answer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questionsData.map((question, index) => (
            <TableRow key={index} style={{ background: selectedOptions[index] === question.correct_answer ? 'green' : 'red'}}>
              <TableCell style={{ color: 'white' }}>{question.question}</TableCell>
              <TableCell style={{ color: 'white' }}>{question.correct_answer}</TableCell>
              <TableCell style={{ color: 'white' }}>{selectedOptions[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p style={{ color: 'black', fontWeight: 'bold' }}>Total Score: {score}</p>
      <Button variant="outlined" size="small" onClick={handleMain} style={{ backgroundColor: 'navy', color: 'white' }}>
                Back to the Main Page
              </Button>
      <br></br>
    </TableContainer>
  );
};

export default QuizResult;