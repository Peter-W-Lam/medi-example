import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import Dashboard from './components/pages/Dashboard'
import Loading from './components/Loading'
import Saved from './components/Saved'
import AdminPanel from './components/AdminPanel'
import PrivateRoute from './components/PrivateRoute'
import './App.css';
import AuthenticationApp from './components/AuthenticationApp';

import {UserProvider} from './components/context/UserContext'
import CorsPage from './components/pages/CorsPage';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/auth" exact component={CorsPage} />
            <PrivateRoute path="/api" component={AuthenticationApp} />
            {/* <Route path="/api/home" component={Dashboard} />
            <Route path="/api/admin" component={AdminPanel} /> */}
            {/* <Route path="/api/saved" component={Saved} /> */}
            {/* <Route path="/api/loading" component={Loading} /> */}
          </Switch>
        </Router>
      </UserProvider>


      {/* {isAuthenticated ? 
      <Placeholder />  :
      <LoginPage />
      } */}
      
    </div>
  );
}

export default App;
