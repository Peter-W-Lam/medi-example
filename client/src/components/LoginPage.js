import React, {useState} from 'react'
import './LoginPage.css'
import { useAuth0 } from "@auth0/auth0-react";
import LoginBG from '../assets/login-bg.png'
import Login from './components/login/Login';
import Signup from './components/login/Signup';

function LoginPage() {

    const { loginWithRedirect } = useAuth0();
    

    return (
        <div className="LoginPage">
            <Signup loginWithRedirect={loginWithRedirect}/>
            <div className="login-right">
                <div className="temp-menu">
                    <a href="#about">About</a>
                    <a href="#legal">Legal</a>
                    <a href="#support">Support</a>
                </div>
                <h1>You help others. <br /> Let us help you. </h1>
                <img src={LoginBG} alt="A team of doctors and nurses" />
            </div>
        </div>
    )
}

export default LoginPage
