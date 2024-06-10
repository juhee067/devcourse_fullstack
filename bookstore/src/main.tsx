import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mock/browser');
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function mountApp() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

mountApp();
