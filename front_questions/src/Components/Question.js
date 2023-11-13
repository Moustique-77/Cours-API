import React from 'react';

const Question = ({ question, onDelete }) => {
  return (
    <div>
      <h3>{question}</h3>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Question;
