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
    domain="dev-r8uf1bz2.us.auth0.com"
    clientId="Qk8g1Mois13CNx9CGHq4GygV0rfBSBOK"
    redirectUri={window.location.origin + '/api/home'}
    audience="http://medi-example"
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
