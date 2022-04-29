import React from 'react';
import './index.css';
import App from './App';

// change for React Version 18

//ReactDOM from 'react-dom' to :
import ReactDOM from 'react-dom/client';

// Replace render by the new root render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
