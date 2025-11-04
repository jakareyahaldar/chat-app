import ReactDOM from 'react-dom/client';
import React from "react"
import ContextWraper from "./context/mainContext.js"
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <CookiesProvider defaultSetOptions={{ path: '/' }} >
      <ContextWraper >
        <App />
      </ContextWraper>
    </CookiesProvider>
  
);

reportWebVitals();
