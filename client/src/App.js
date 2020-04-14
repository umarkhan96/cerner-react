import React from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.css';
import './App.css';
import Routes from './config/router/router';
import { store, persistor } from '../src/config/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
