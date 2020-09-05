import React from 'react'
import {LogoSquare as Logo} from '../../../assets'
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import Step from './Step'

export default function Signup(props) {
    return (
        <div className="reg-left Signup">
            <img src={Logo} alt="Medi" className="logo"/>
            
            <div className="systems">
                <p>Medi is currently partnered with the following healthcare systems. Don’t see yours? <Link to="/support">Contact us</Link> so that we can work to grant access to professionals in your healthcare system. </p>
                {/* Placeholder image: */}
                <img src="https://www.mountsinaibrandcenter.org/Content/UI/images/nonreg_MSMC_RGB_Hrztl.png" alt="Mount Sinai Healthcare System" />
            </div>
            <span className="underline">
                <h3 className="underline-text">How to register with Medi</h3>
            </span>
            <div className="steps">
                <Step num="1" text="Register for your Medi account with any email, such as your personal email"/>
                <Step num="2" text="After registering, we’ll need to verify your status as a healthcare professional. We’ll do this by asking for your healthcare network email, as well as additional information to confirm your identity. "/>
                <Step num="3" text="Once you’ve been verified, start accessing exclusive offers and discounts!"/>
            </div>
            <Button 
                className="primary-btn" 
                id="login-btn" 
                onClick={() => props.loginWithRedirect()}
                size="lg"
            >
                    Register with Medi
                </Button>
            
            <p>Already have an account? <a href="#" onClick={() => props.setIsLogin(true)}>Log in to Medi</a></p>
        </div>
    )
}
