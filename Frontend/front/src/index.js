import React from 'react';
import ReactDOM from 'react-dom/client';
import authReducer from './state/index.js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
persistStore,
persistReducer,
FLUSH,
REHYDRATE,
PAUSE,
PERSIST,
PURGE,
REGISTER
}from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {key : "root" , storage, version:1};
const persisttReducer = persistReducer(persistConfig,authReducer);
const store = configureStore({
  reducer:persisttReducer
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
