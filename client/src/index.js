import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore  } from '@reduxjs/toolkit';
import reducers from './reducers/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
});

root.render(
  <Provider store={store} >
    <Router>
        <App />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
