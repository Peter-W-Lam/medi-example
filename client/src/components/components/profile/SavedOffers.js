import React, { useState, useEffect } from 'react'
import {fetchCouponByID} from '../../../api/fetchPosts'
import { Link } from 'react-router-dom'
import './SavedOffers.css'
import Card from '../dashboard/Card'

export default function SavedOffers(props) {
    const [coupon1, setCoupon1] = useState(null)
    const [coupon2, setCoupon2] = useState(null)

    const setCouponInfo = async () => {
        if (props.user.savedCoupons.length < 1) return;

        const info1 = await fetchCouponByID(props.user.accessToken, props.user.savedCoupons[0])
        setCoupon1(info1)

        if (props.user.savedCoupons.length > 1) {
            const info2 = await fetchCouponByID(props.user.accessToken, props.user.savedCoupons[1])
            setCoupon2(info2)
        }
    }

    useEffect(() => {
        if (props.user.savedCoupons) {
            setCouponInfo()
        }
    }, [props.user])

    return (
        <div className="SavedOffers">
            <span className="uppercased-subtitle"><h3>Recently Saved Offers</h3></span>
            {props.user.savedCoupons && 
            (props.user.savedCoupons.length > 0 ? 
            (<div className="cards">
                {coupon1 && 
                <Card 
                    user={props.user}
                    img={coupon1.logo}
                    name={coupon1.company}
                    tagline={coupon1.shortDescription}
                    id={coupon1._id}
                    {...coupon1}
                />}
                {coupon2 && 
                <Card 
                    user={props.user}
                    img={coupon2.logo}
                    name={coupon2.company}
                    tagline={coupon2.shortDescription}
                    id={coupon2._id}
                    {...coupon2}
                />}
                <Link to="/api/saved">
                    <div className="card">
                        <p>See all →</p>
                    </div>
                </Link>
            </div>) : 
            <div className="card">
                <p>You haven't saved any offers yet! </p>
            </div>)
            }

            
        </div>
    )
}
