import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
  // Removed React.StrictMode wrapper
  // Note: no scope yet
ReactDOM.render(
    <Auth0Provider
    domain="mymedi.us.auth0.com"
    clientId="EfVook2IGHHIapF2WbkCQmhc4j5Oyv2Z"
    redirectUri={window.location.origin + '/api/home'}
    audience="https://medi/api"
    scope="edit:coupons"
    useRefreshTokens={true}
    // cacheLocation="localstorage"
    >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
