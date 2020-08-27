import React from 'react'
import SettingsForm from '../components/settings/SettingsForm'
import './Settings.css'
import SmallSpinner from '../components/SmallSpinner'

function Settings(props) {
    return (
        <div className="Settings">
            {props.user.isVerified != null ?
            <div className="card">
                <div className="header">
                    <img src={props.user.picture} />
                    <div className="info">
                        <h1>{props.user.name}</h1>
                        <p>{props.user.healthcareEmail ? props.user.healthcareEmail : 'No network email has been set'}</p>
                        <p>{props.user.healthcareSystem ? props.user.healthcareSystem : 'No healthcare system has been set'}</p>
                        <p>{props.user.isVerified ? 'Verified' : 'Unverified'}</p>
                    </div>
                </div>
                <SettingsForm user={props.user}/>
            </div>: 
            <SmallSpinner loading={true} />}
            
        </div>
    )
}

export default Settings
