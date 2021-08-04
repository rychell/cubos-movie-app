import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MoviedbProvider } from './hooks/useMoviedb';

ReactDOM.render(
  <React.StrictMode>
    <MoviedbProvider>
      <App />
    </MoviedbProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
