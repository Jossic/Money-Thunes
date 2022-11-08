import React from 'react';
import './index.css';
import App from './App';
import { Provider } from './context/AccountContext';

// change for React Version 18

//ReactDOM from 'react-dom' to :
import ReactDOM from 'react-dom/client';

// Replace render by the new root render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
