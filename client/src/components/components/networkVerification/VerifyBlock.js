import React, {useState, useEffect, useContext} from 'react'
import {Button} from 'reactstrap'
import VerifyForm from './VerifyForm'
import { Mail } from '../../../assets'

export default function VerifyBlock() {

    // TODO: Set validatedScreen according to whether email has been sent (lookup token)
    const [validatedScreen, setValidatedScreen] = useState(false)
    const [formValues, setFormValues] = useState({
        healthcareSystem: 'System 1', 
        healthcareRole: 'Role #1'
    });

    return (
        <div className="VerifyBlock">
            {validatedScreen ?
            <div className="check-inbox">
                <h1>Check your inbox!</h1>
                <p>To complete your verification, click the link that we sent to your network email at <span className="bold">{formValues.networkEmail}</span></p>
                <img src={Mail} alt="Man putting envelope in mailbox" />
                <Button color="link" onClick={() => setValidatedScreen(!validatedScreen)}>Change network details</Button>
            </div> 
            :
            <VerifyForm 
                formValues={formValues}
                setFormValues={setFormValues}
                setValidatedScreen={setValidatedScreen} 
                />
            }
            
        </div>
    )
}
