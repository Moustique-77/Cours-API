import React from 'react';

const Question = ({ id, theme, question, reponse, onDelete, onModify, isEditing, editTheme, setEditTheme, editQuestion, setEditQuestion, editResponse, setEditResponse, saveEdit, setEditingId }) => {
  if (isEditing) {
    return (
      <div className='question'>
        <input value={editTheme} onChange={(e) => setEditTheme(e.target.value)} />
        <input value={editQuestion} onChange={(e) => setEditQuestion(e.target.value)} />
        <input value={editResponse} onChange={(e) => setEditResponse(e.target.value)} />
        <button onClick={saveEdit}>Save</button>
        <button onClick={() => setEditingId(null)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className='question'>
      <h1>Question n° : {id}</h1>
      <h2>Thème : {theme}</h2>
      <h3>{question}</h3>
      <h4>Réponse : {reponse}</h4>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onModify}>Modify</button>
    </div>
  );
};


export default Question;
