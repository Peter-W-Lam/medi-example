import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { saveCoupon, unsaveCoupon } from '../../../api/fetchPosts'
import axios from 'axios'
// import {usePalette} from 'react-palette'
import './Card.css'

function Card(props) {
    // const {data, loading, error} = usePalette(props.img)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const savedCoupons = props.user.savedCoupons
        const c = savedCoupons.filter(item => item === props._id)
        if (c.length > 0) {
            setSaved(true)
        }
    }, [])

    const handleSave = () => {
        setSaved(!saved)
        if (saved) {
            console.log("Unsaving card...")
            unsaveCoupon(props.user.accessToken, props.user._id, props._id)
        } else {
            console.log("Saving card...")
            // Create POST request to '/api/users/:id/coupons
            if (props.user.accessToken) {
                saveCoupon(props.user.accessToken, props.user._id, props._id)
            } else {
                console.log("could not make request bc no accesss token")
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
