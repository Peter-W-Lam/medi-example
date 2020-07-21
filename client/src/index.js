import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
    domain="mymedi.us.auth0.com"
    clientId="EfVook2IGHHIapF2WbkCQmhc4j5Oyv2Z"
    redirectUri={window.location.origin}
    // audience="https://mymedi.us.auth0.com/api/v2/" //Replace with our API
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
