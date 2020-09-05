import React from 'react'
import {LogoSquare as Logo} from '../../../assets'
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'

export default function Login(props) {
    return (
        <div className="Login reg-left">
            <img src={Logo} alt="Medi" className="logo"/>
            <span className="underline">
                <h3 className="underline-text">Welcome back!</h3>
            </span>
            <div className="systems">
                <p>Medi is currently partnered with the following healthcare systems. Don’t see yours? <Link to="/support">Contact us</Link> so that we can work to grant access to professionals in your healthcare system. </p>
                {/* Placeholder image: */}
                <img src="https://www.mountsinaibrandcenter.org/Content/UI/images/nonreg_MSMC_RGB_Hrztl.png" alt="Mount Sinai Healthcare System" />
            </div>
            <Button 
                className="primary-btn" 
                id="login-btn" 
                onClick={() => props.loginWithRedirect()}
                size="lg"
            >
                    Go to sign-in
                </Button>
            
            <p>Don't have an account? <a href="#" onClick={() => props.setIsLogin(false)}>Join Medi</a></p>
        </div>
    )
}
