import React, {useState} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {sendSupportEmail} from '../../../api/email'
import './SupportBlock.css'
import { toast } from 'react-toastify';

export default function SupportBlock(props) {
    const [message, setMessage] = useState('')

    const handleChange = e => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        sendSupportEmail(props.user.email, message)
        toast.success('Your support message has been sent!')
    }

    return (
        <div className="SupportBlock">
            <AvForm onChange={handleChange} onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="supportmessage">Message</Label>
                    <AvField name="supportmessage" type="textarea" id="supportmessage" validate={{
                        required: {value: true, errorMessage: 'Please enter a message'},
                        minLength: {value: 6, errorMessage: 'Message must have at least 6 characters'},
                        maxLength: {value: 10000}
                    }} />
                </FormGroup>
                <Button className="primary-btn">Send message</Button>
            </AvForm>
        </div>
    )
}
