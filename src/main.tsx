import React from 'react';
import ReactDOM from 'react-dom/client';
import "./app/styles/index.css";
import "./app/styles/globals.css";
import App from "./app";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
