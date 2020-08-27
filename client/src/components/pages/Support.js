import React from 'react'
import SupportBlock from '../components/support/SupportBlock'
import {SupportMail} from '../../assets'
import './Support.css'

function Support(props) {
    return (
        <div className="Support">
            <div className="card">
                <h1>Support</h1>
                <p>Questions? Concerns? Send us a message and we'll get back to you as soon as we can!</p>
                <img src={SupportMail} alt="Man sending off a letter" />
                
                <SupportBlock user={props.user}/>
            </div>
            
        </div>
    )
}

export default Support
