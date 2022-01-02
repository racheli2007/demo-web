import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { i18n } from '@lingui/core';
import { reportWebVitals } from './reportWebVitals';
import { StoreContext } from '../src/stores/use-webrtc-store'
import { WebRtcRootStore } from '../src/stores/webrtc-root-store'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
const I18nProvider = require('@lingui/react').I18nProvider;

ReactDOM.render(
  <React.StrictMode>
    <I18nProvider i18n={i18n}>
      <StoreContext.Provider value={new WebRtcRootStore()}
      ><App />
      </StoreContext.Provider>
      </I18nProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
