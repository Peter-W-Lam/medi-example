import React, { useState, useEffect} from 'react'
import {fetchCouponByID} from '../../../api/fetchPosts'
import Card from '../dashboard/Card'
import './Saved.css'


// 1. Get user's list of coupon ID's 
// 2. For each coupon ID, call the fetch coupon by ID method and store in array
// (in the future we should probably store coupons and not just ID's)
// 3. Call array.map and display cards. 

export default function SavedCards(props) {
    const [savedIDs, setSavedIDs] = useState([])
    const [couponArray, setCouponArray] = useState([])
    const [filteredCoupons, setFilteredCoupons] = useState([])

    // TODO: Refactor User model so that it stores coupons vs. IDs alone
    const getCouponData = async () => {
        const newCouponArray = []

        for (var i = 0; i < savedIDs.length; i++) {
            const data = await fetchCouponByID(props.user.accessToken, savedIDs[i])
            newCouponArray.push(data)
        }

        setCouponArray(newCouponArray)
    }

    const filterByTitle = (query) => {
        const filtered = couponArray.filter(c => c.company.includes(query))
        setFilteredCoupons(filtered)
    }

    useEffect(() => {
        if (props.user.savedCoupons) {
            setSavedIDs(props.user.savedCoupons)
        }
    }, [props.user])

    useEffect(() => {
        if (savedIDs.length > 0) {
            getCouponData()
        }
    }, [savedIDs])

    useEffect(() => {
        filterByTitle(props.query)
    }, [props.query, couponArray])

    
    return (
        <div className="SavedCards">
            {filteredCoupons.map(coupon => (
                <Card 
                    user={props.user}
                    img={coupon.logo}
                    name={coupon.company}
                    tagline={coupon.shortDescription}
                    id={coupon._id}
                    key={coupon._id}
                    {...coupon}
                />
            ))}
        </div>
    )
}
