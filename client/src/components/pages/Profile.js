import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import ProfileInfo from '../components/profile/ProfileInfo'
import './Profile.css'
import SavedOffers from '../components/profile/SavedOffers'
import SmallSpinner from '../components/SmallSpinner'
import {UserContext} from '../context/UserContext'

export default function Profile(props) {
    const [user, setUser] = useContext(UserContext)

    return (
        <div className="Profile">
            {user.savedCoupons ? 
            <>
                <Link to="/api/settings" className="settings-btn">
                    <Button className="primary-btn" size="lg">Settings</Button>
                </Link>

                <ProfileInfo user={user}/>
                <SavedOffers user={user}/>
            </> : 
            <SmallSpinner loading={true} /> 
            }
        </div>

        
    )
}
