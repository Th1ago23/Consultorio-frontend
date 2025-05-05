import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // renomeado para deixar claro que são as rotas
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
