import React, {useEffect, useState, useContext} from 'react'
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react"

// import CouponList from './CouponList'
import Loading from '../Loading'
import VerifyForm from '../components/networkVerification/VerifyForm'
import VerifyBlock from '../components/networkVerification/VerifyBlock'
import SmallSpinner from '../components/SmallSpinner'
import SearchBar from '../components/dashboard/SearchBar'
import CardList from '../components/dashboard/CardList'
import Categories from '../components/dashboard/Categories'
import {UserContext} from '../../components/context/UserContext'


const axios = require('axios')


function Dashboard(props) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all"
    )
    const [user, setUser] = useContext(UserContext)

    const [sortType, setSortType] = useState("alpha")
    // useEffect(() => {
    //     console.log("access token:", props.user.accessToken)
    // }, [props.user])

    return (
        <div className="Dashboard">
            
            {user.isVerified != null ? 
             (user.isVerified ?
            <div>
                <SearchBar setSearchQuery={setSearchQuery} setSortType={setSortType}/>
                <Categories selected={selectedCategory} setSelected={setSelectedCategory}/>
                <CardList query={searchQuery} category={selectedCategory} sortType={sortType}/>
            </div> :
             <VerifyBlock />) :
             <SmallSpinner loading={true}/>}
        </div>
    )
}

export default Dashboard
