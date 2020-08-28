import React from 'react'
import {Error} from '../../assets'
import {Link} from 'react-router-dom'
import './NoMatch.css'

export default function NoMatch() {
    return (
        <div className="NoMatch">
            <h1>Whoops! We couldn't find anything here. </h1>
            <Link to="/api/home">Click to go back to your dashboard</Link>
            <img src={Error} alt="404 error" />
        </div>
    )
}
