import React from 'react'
import './ProfileInfo.css'
import {Verified, Unverified} from '../../../assets'
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

export default function ProfileInfo(props) {
    // if (props.user.date) {
    //     console.log()
    // }

    return (
        <div className="ProfileInfo">
            <div className="profile-picture">
                <img src={props.user.picture} alt="Profile" />
            </div>
            
            <div className="name">
                <h1>{props.user.name}</h1>
                <img src={props.user.isVerified ? Verified : Unverified} 
                     alt={props.user.isVerified ? 'Verified user' : 'Unverified user'} 
                     data-tip={props.user.isVerified ? 'Your profile has been verified' : 'Your profile has not yet been verified'}/>
                <ReactTooltip />
            </div>

            
            {props.user.healthcareSystem && <p>{props.user.healthcareSystem}</p>}
            <p>{props.user.date && ("Joined " + moment(props.user.date).format("MMMM YYYY"))}</p>
        </div>
    )
}
