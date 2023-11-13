import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    fetchQuestions();
    setQuestions([]);
  }, []);

  const fetchQuestions = () => {
    axios.get('http://localhost:3001/question')
      .then(res => {
        setQuestions(res.data);
      })
      .catch(err => console.error(err));
  };

  const handleAddQuestion = () => {
    axios.post('http://localhost:3001/question', { question: newQuestion })
      .then(() => {
        fetchQuestions();
        setNewQuestion('');
      })
      .catch(err => console.error(err));
  };

  const handleDeleteQuestion = (id) => {
    axios.delete(`http://localhost:3001/question/${id}`)
      .then(() => {
        fetchQuestions();
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <div>
        <input 
          type="text" 
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
      {questions.map(question => (
        <Question 
          key={question.id} 
          question={question.question}
          onDelete={() => handleDeleteQuestion(question.id)}
        />
      ))}
    </div>
  );
};

export default Quiz;
