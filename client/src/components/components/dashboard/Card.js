import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { saveCoupon, unsaveCoupon } from '../../../api/fetchPosts'
import {UserContext} from '../../context/UserContext'
import './Card.css'

function Card(props) {
    // const {data, loading, error} = usePalette(props.img)
    const [saved, setSaved] = useState(false)
    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
        const savedCoupons = user.savedCoupons
        const c = savedCoupons.filter(item => item === props._id)
        if (c.length > 0) {
            setSaved(true)
        }
    }, [])

    const handleSave = () => {
        setSaved(!saved)
        if (saved) {
            unsaveCoupon(user.accessToken, user._id, props._id)
        } else {
            // Create POST request to '/api/users/:id/coupons
            if (user.accessToken) {
                saveCoupon(user.accessToken, user._id, props._id)
            } else {
                console.log("Could not make request because no access token was found")
            }
        }
    }


    return (
        <div className="Card" id={props._id}>
            {/* <div className="image-box" style={{backgroundColor: data.vibrant}}> */}
            <div className="image-box">
                <img src={props.img} alt="Logo for company" />
            </div>
            <button 
                className={saved ? "saved save-btn" : "save-btn"}
                onClick={handleSave}>
                {saved ? "Saved" : "Save"}
            </button>
            <div className="contents">
                <h1>{props.name}</h1>
                <Link to={`/api/coupons/${props._id}`}>{props.tagline} →</Link>
            </div>

            
        </div>
    )
}

export default Card
