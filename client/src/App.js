import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import LoginPage from './components/components/login/LoginPage'
import PrivateRoute from './components/PrivateRoute'
import './App.css';
import AuthenticationApp from './components/AuthenticationApp';

import {UserProvider} from './components/context/UserContext'

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <PrivateRoute path="/api" component={AuthenticationApp} />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
