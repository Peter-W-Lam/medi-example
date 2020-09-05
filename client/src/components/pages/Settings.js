import React, {useContext} from 'react'
import SettingsForm from '../components/settings/SettingsForm'
import './Settings.css'
import SmallSpinner from '../components/SmallSpinner'
import {UserContext} from '../context/UserContext'
function Settings(props) {

    const [user, setUser] = useContext(UserContext)

    return (
        <div className="Settings">
            {user.isVerified != null ?
            <div className="card">
                <div className="header">
                    <img src={user.picture} />
                    <div className="info">
                        <h1>{user.name}</h1>
                        <p>{user.healthcareEmail ? user.healthcareEmail : 'No network email has been set'}</p>
                        <p>{user.healthcareSystem ? user.healthcareSystem : 'No healthcare system has been set'}</p>
                        <p>{user.isVerified ? 'Verified' : 'Unverified'}</p>
                    </div>
                </div>
                <SettingsForm user={user}/>
            </div>: 
            <SmallSpinner loading={true} />}
            
        </div>
    )
}

export default Settings
