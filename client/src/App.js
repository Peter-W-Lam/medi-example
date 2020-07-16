import React from 'react';
import './App.css';
import LoginPage from './components/LoginPage'
import {useAuth0} from "@auth0/auth0-react"
import Placeholder from './components/Placeholder'

function App() {
  const {isAuthenticated} = useAuth0();

  return (
    <div className="App">
      {isAuthenticated ? 
      <Placeholder /> :
       <LoginPage />
      }
      
    </div>
  );
}

export default App;
