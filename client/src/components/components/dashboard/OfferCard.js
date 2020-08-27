import React, { useState, useEffect } from 'react'
import {fetchCouponByID, fetchOfferByID} from '../../../api/fetchPosts'
import { useParams, Link } from 'react-router-dom'
import {Button} from 'reactstrap'
import './CouponCard.css'

export default function OfferCard(props) {
    const {couponID, offerID} = useParams()
    const [offer, setOffer] = useState(null)
    const [coupon, setCoupon] = useState(null)
    const [displayCode, setDisplayCode] = useState(false)

    useEffect(() => {
        if (props.user.accessToken) {
            // Refactor to just get offer by ID from coupon data
            fetchOfferByID(props.user.accessToken, couponID, offerID)
            .then(res => {setOffer(res)});

            fetchCouponByID(props.user.accessToken, couponID)
            .then(res => setCoupon(res));
        }
    }, [props.user])


    return (
        <div className="OfferCard">
            <Link to="/api/home">← Back to dashboard</Link>
            <div className="card">
                {(offer && coupon) && 
                (<div>
                    <img src={coupon.logo} alt={`Logo for ${coupon.company}`} className="card-img-header"/>
                    <div className="offer-text">
                        <h3>{offer.headline}</h3>
                        <p>{offer.description}</p>
                        {offer.code ?
                        <div className="revealCode">
                            <Button 
                                className="primary-btn" 
                                id="reveal-btn" 
                                onClick={() => setDisplayCode(true)}>Reveal Code</Button>
                            <pre className={displayCode ? "displayed offer-code" : "offer-code"}>{offer.code}</pre>
                        </div> : 
                        <Link to={offer.link}>
                            <Button className="primary-btn">Go to site</Button>
                        </Link>
                        }
                    </div>
                    {offer.termsAndConditions && 
                        <div className="terms">
                            <h3>Terms and Conditions</h3>
                            <p>{offer.termsAndConditions}</p>
                        </div>  
                    }
                    
                </div>)}

            </div>
        </div>
    )
}
