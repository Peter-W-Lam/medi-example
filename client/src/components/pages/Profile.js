import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import ProfileInfo from '../components/profile/ProfileInfo'
import './Profile.css'
import SavedOffers from '../components/profile/SavedOffers'
import SmallSpinner from '../components/SmallSpinner'


export default function Profile(props) {
    return (
        <div className="Profile">
            {
            props.user.savedCoupons ? 
            <>
                <Link to="/api/settings" className="settings-btn">
                    <Button className="primary-btn" size="lg">Settings</Button>
                </Link>

                <ProfileInfo user={props.user}/>
                <SavedOffers user={props.user}/>
            </> : 
            <SmallSpinner loading={true} /> 
            }
        </div>

        
    )
}
