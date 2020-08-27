import React, { useState, useEffect } from 'react'
// import {fetchCouponByID} from '../../../api/fetchPosts'
import {useParams, Link} from 'react-router-dom'
import {Button} from 'reactstrap'


import './CouponCard.css'

export default function CouponCard(props) {
    const {couponID} = useParams()
    const [data, setData] = useState(null)

    useEffect(() => {
        // if (props.user.accessToken) {
        //     fetchCouponByID(props.user.accessToken, couponID)
        //     .then(res => {
        //         setData(res)
        //     })
        // }
        
    }, [props.user])
    

    return (
        <>
        {data && <div className="CouponCard">
            <Link to="/api/home">← Back to dashboard</Link>
            <div className="card">
                <div className="header">
                    <img src={data.logo} alt={`${data.company} logo`} className="card-img-header"/>
                    <div>
                        <h1>{data.company}</h1>
                        <p>{data.companyDescription}</p>
                    </div>
                </div>
                <h3>Current Offers</h3>
                <div className="offers">
                    {data.offers.map(offer => (
                        <div className="offer-box">
                            <p>{offer.headline}</p>
                            <Link to={`/api/coupons/${couponID}/offer/${offer._id}`}>
                                <Button className="primary-btn" size="lg">Get offer</Button>
                            </Link>
                        </div>    
                    ))}
                </div>
            </div>
            
        </div>}
        </>
    )
}
