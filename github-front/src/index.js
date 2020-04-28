import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer  from './reducers';
import middleware from './middleware';

import { ToastProvider } from 'react-toast-notifications'


const store =  createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ToastProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
