import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { fetchDictionary } from './dictionaryDataSource'
import { sendToFirebaseAnalytics } from './firebase'

//pre-fetch dicionary
fetchDictionary()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//TODO automatically detect environment and use proerp reporting
// reportWebVitals(console.log);
reportWebVitals(sendToFirebaseAnalytics);
