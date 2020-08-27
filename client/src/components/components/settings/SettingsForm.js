import React, { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {toast} from 'react-toastify'
import systemInfo from '../../../utils/healthcareSystems'
import {updateUserInfo} from '../../../api/userInfo'
import {Link} from 'react-router-dom'
import './SettingsForm.css'

export default function SettingsForm(props) {
    const [formValues, setFormValues] = useState({})

    const handleInputChange = (e) => {
        const newValues = {...formValues}
        newValues[e.target.name] = e.target.value
        setFormValues(newValues)
    }   

    const handleSubmit = (e) => {
        // Make PUT request to server
        updateUserInfo(props.user.accessToken, props.user._id, formValues)
    }

    const handleInvalidSubmit = (e) => {
        toast.error('One or more fields is invalid!');
    }

    const setUserValues = () => {
        const userInfo = {
            name: props.user.name,
            email: props.user.email, 
            healthcareEmail: props.user.healthcareEmail, 
            healthcareSystem: props.user.healthcareSystem, 
            healthcareRole: props.user.healthcareRole
        }
        setFormValues(userInfo)
    }

    useEffect(() => {
        if (props.user) {
            setUserValues()
        }
    }, [props.user])

    return (
        <div className="SettingsForm">
            <AvForm onChange={handleInputChange} onInvalidSubmit={handleInvalidSubmit} onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <AvField 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="First Last" 
                        validate={{
                            minLength: {value: 2},
                            maxLength: {value: 25}
                        }}
                        value={formValues.name}
                        required/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Account Email</Label>
                    <FormText>This is the email you use to log into Medi.</FormText>
                    <AvField 
                        type="text" 
                        name="email" 
                        id="email" 
                        placeholder="First Last" 
                        validate={{
                            email: true
                        }}
                        value={formValues.email}
                        required/>
                </FormGroup>
                {props.user.isVerified ? 
                <div>
                <FormGroup>
                    <Label for="healthcareEmail">Network Email</Label>
                    <FormText>This is your network email used to verify your status as a healthcare professional.</FormText>
                    <AvField 
                        type="email" 
                        name="healthcareEmail" 
                        id="healthcareEmail" 
                        placeholder="jdoe@healthcaresystem.org" 
                        validate={{
                            minLength: {value: 2},
                            maxLength: {value: 25}
                        }}
                        value={formValues.healthcareEmail}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="healthcareSystem">Healthcare System</Label>
                    <Input 
                        type="select" 
                        name="healthcareSystem" 
                        id="healthcareSystem"
                        value={formValues.healthcareSystem}>
                        {systemInfo.map(obj => <option>{obj.name}</option>)}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="healthcareRole">Healthcare Role</Label>
                    <Input
                        type="select"
                        name="healthcareRole"
                        id="healthcareRole"
                        value={formValues.healthcareRole}
                        >
                        <option>Role #1</option>
                        <option>Role #2</option>
                        <option>Role #3</option>
                    </Input>
                </FormGroup>
                </div> : 
                <div className="unverified-block">
                    <h2>You haven't completed your healthcare verification yet.</h2>
                    <Link to="/api/home">Verify your network email and get started!</Link>
                </div>}
                <Button className="primary-btn">Save changes</Button>
            </AvForm>
        </div>
    )
}
