import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import './index.css';
import App from './App';
import user from './reducer'
const store=createStore(user);

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);

