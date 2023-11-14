import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);

  const [newQuestion, setNewQuestion] = useState('');
  const [newTheme, setNewTheme] = useState('');
  const [newResponse, setNewResponse] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editTheme, setEditTheme] = useState('');
  const [editQuestion, setEditQuestion] = useState('');
  const [editResponse, setEditResponse] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    axios.get('http://localhost:3001/question')
      .then(res => {
        setQuestions(res.data);
      })
      .catch(err => console.error(err));
  };

  const handleAddQuestion = () => {
    axios.post('http://localhost:3001/question', {
      theme: newTheme,
      question: newQuestion,
      reponse: newResponse
    })
    .then(() => {
      fetchQuestions();
      setNewQuestion('');
      setNewTheme('');
      setNewResponse('');
    })
    .catch(err => {
      console.error('Error during API call:', err);
      console.error('Response data:', err.response.data);
    });
  };
  

  const handleDeleteQuestion = (id) => {
    axios.delete(`http://localhost:3001/question/${id}`)
      .then(() => {
        fetchQuestions();
      })
      .catch(err => console.error(err));
  };

  const handleUpdateQuestion = (id, updatedQuestion) => {
    axios.put(`http://localhost:3001/question/${id}`, updatedQuestion)
      .then(() => {
        fetchQuestions();
      })
      .catch(err => console.error(err));
  };

  const isButtonDisabled = !newTheme || !newQuestion || !newResponse;

  return (
    <div>
      <div>
        <input 
          type="text" 
          value={newTheme}
          onChange={(e) => setNewTheme(e.target.value)}
          placeholder="Thème"
        />
        <input 
          type="text" 
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Question"
        />
        <input 
          type="text" 
          value={newResponse}
          onChange={(e) => setNewResponse(e.target.value)}
          placeholder="Réponse"
        />
        <button onClick={handleAddQuestion} disabled={isButtonDisabled}>Add Question</button>
      </div>
      <div className='question'>
        {questions.map(question => (
          <Question 
            key={question.id}
            id={question.id}
            theme={question.theme}
            question={question.question}
            reponse={question.reponse}
            onDelete={() => handleDeleteQuestion(question.id)}
            onModify={() => {
              setEditingId(question.id);
              setEditTheme(question.theme);
              setEditQuestion(question.question);
              setEditResponse(question.reponse);
            }}
            isEditing={editingId === question.id}
            editTheme={editTheme}
            setEditTheme={setEditTheme}
            editQuestion={editQuestion}
            setEditQuestion={setEditQuestion}
            editResponse={editResponse}
            setEditResponse={setEditResponse}
            saveEdit={() => {
              handleUpdateQuestion(editingId, { theme: editTheme, question: editQuestion, reponse: editResponse });
              setEditingId(null); // Reset editing state
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Quiz;
