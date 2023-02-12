import React from 'react';
import { render } from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store/store';

import './styles/style.scss';

const container = document.getElementById('root')
const clientId = process.env.REACT_APP_CLIENT_ID || "";

render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode> , container)