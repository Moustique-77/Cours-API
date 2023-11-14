import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Création de la racine de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendu de l'application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
