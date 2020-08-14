import React, {useState, useEffect} from 'react'
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react"
import Loading from './Loading'
import NavBar from './NavBar'
import CouponCard from './CouponCard'
import axios from 'axios'

function Saved() {
    const [cards, setCards] = useState([])

    useEffect(() => {
        const id = localStorage.getItem("id")
        axios.get(`/api/users/${id}`)
             .then(res => {
                const savedCoupons = res.data.savedCoupons
                console.log("savedCoupons:", savedCoupons)
                savedCoupons.forEach(id => {
                    console.log("ID:", id)
                    axios.get(`/api/coupons/${id}`)
                         .then(res => {
                             const c = (
                                 <CouponCard 
                                    key={res.data._id}
                                    title={res.data.companyName}
                                    shortDescription={res.data.shortDescription}
                                    offerText="To come..."
                                 />
                             )
                             setCards(cards.concat(c))
                         })
                });
             })
             .catch(e => console.log(e))
    }, [])

    return (
        <div>
            <NavBar />
            <div style={{margin: "10vh 10vw"}}>
                {cards}
            </div>
            
        </div>
    )
}

export default withAuthenticationRequired(Saved, {
    onRedirecting: () => <Loading />
})