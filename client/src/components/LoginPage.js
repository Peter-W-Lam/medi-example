import React from 'react'
import './LoginPage.css'
import { useAuth0 } from "@auth0/auth0-react";
import Logo from '../assets/logo.jpg'
import LoginBG from '../assets/login-bg.png'
import Button from './Button'

function LoginPage() {

    const { loginWithRedirect } = useAuth0();
    return (
        <div className="LoginPage">
            <div className="login-left">
                <img src={Logo} alt="Medi m" />
                <span className="underline">
                    <h3 className="underline-text">Welcome back to Medi!</h3>
                </span>
                <a href="#">
                    <Button title="Go to sign in" id="login-btn" onClick={() => loginWithRedirect()}/>
                </a>
                <p>Don't have an account? <span className="clickable-text">Join Medi</span></p>
            </div>
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
