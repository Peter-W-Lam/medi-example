import React, {useEffect, useState} from 'react'
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react"

// import CouponList from './CouponList'
import Loading from '../Loading'
import VerifyForm from '../components/networkVerification/VerifyForm'
import VerifyBlock from '../components/networkVerification/VerifyBlock'
import SmallSpinner from '../components/SmallSpinner'
import SearchBar from '../components/dashboard/SearchBar'
import CardList from '../components/dashboard/CardList'
import Categories from '../components/dashboard/Categories'

const axios = require('axios')


function Dashboard(props) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all"
    )
    // useEffect(() => {
    //     console.log("access token:", props.user.accessToken)
    // }, [props.user])

    return (
        <div className="Dashboard">
            
            {props.user.isVerified != null ? 
             (props.user.isVerified ?
            <div>
                <SearchBar setSearchQuery={setSearchQuery}/>
                <Categories selected={selectedCategory} setSelected={setSelectedCategory}/>
                <CardList query={searchQuery} user={props.user} category={selectedCategory}/>
            </div> :
             <VerifyBlock user={props.user} />) :
             <SmallSpinner loading={true}/>}
        </div>
    )
}

export default Dashboard
