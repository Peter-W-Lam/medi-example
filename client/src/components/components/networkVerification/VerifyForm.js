import React, { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {sendVerificationEmail} from '../../../api/emailVerification'


import './VerifyBlock.css'

function VerifyForm(props) {
    const domains = ['system1.org', 'gmail.com', 'mymedi.us']
    const [healthcareDomain, setHealthcareDomain] = useState(domains[1])

    const handleInputChange = (e) => {
        const newValues = {...props.formValues}
        newValues[e.target.name] = e.target.value
        props.setFormValues(newValues)

    }   

    const handleSubmit = (e) => {
        // Make POST request
        sendVerificationEmail(props.formValues.networkEmail, props.user.accessToken, props.user._id)
        
        props.setValidatedScreen(true)
    }

    const handleInvalidSubmit = (e) => {
        console.log("Errors!")
    }

    useEffect(() => {
    }, [props.formValues])

    // Update required email domain with form input
    useEffect(() => {
        switch(props.formValues.healthcareSystem) {
            case 'System 1': 
                setHealthcareDomain(domains[0])
                break;
            case 'Gmail (Testing Route)':
                setHealthcareDomain(domains[1])
                break;
            case 'Medi (Testing Route)':
                setHealthcareDomain(domains[2])
                break;
            default:
                setHealthcareDomain(domains[0])
        }
    }, [props.formValues.healthcareSystem])
    
    return (
        <div className="VerifyForm">
            <AvForm onChange={handleInputChange} onValidSubmit={handleSubmit} onInvalidSubmit={handleInvalidSubmit}>
                <h2>Verify your account</h2>
                <p>Real quick--we need to verify that you're a healthcare professional! Let's get you set up so that you can get access to new deals and offers.</p>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <AvField 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="First Last" 
                        required/>
                    <FormFeedback>This field is required.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="healthcareSystem">Healthcare System Affiliation</Label>
                    <Input type="select" name="healthcareSystem" id="healthcareSystem">
                        <option>System 1</option>
                        <option>Gmail (Testing Route)</option>
                        <option>Medi (Testing Route)</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="dateOfBirth">Date of Birth</Label>
                    <AvField
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        placeholder="mm/dd/yyyy"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="networkEmail">Network Email</Label>
                    <AvField
                        type="email"
                        name="networkEmail"
                        id="networkEmail"
                        placeholder="jdoe@email.com"
                        validate={{
                            required: {value: true, errorMessage: 'Please enter your network email.'},
                            pattern: {
                                value: `^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(${healthcareDomain})\$`,
                                errorMessage: 'Your email domain must match your healthcare system'},
                        }}
                    />
                    <FormText>
                        Note: This email must be affiliated with your healthcare network, and should end in <span className="bold">@{healthcareDomain}</span>
                    </FormText>
                </FormGroup>
                {/* <FormGroup>
                    <Label for="healthcareRole">Role</Label>
                    <Input type="select" name="healthcareRole" id="healthcareRole">
                        <option>Role #1</option>
                        <option>Role #2</option>
                        <option>Role #3</option>
                    </Input>
                </FormGroup> */}
                <Button color="primary">Submit</Button>
            </AvForm>

            
        </div>
    )
}

export default VerifyForm
