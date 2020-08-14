import React, {useEffect, useState} from 'react'
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react"

import CouponList from './CouponList'
import Loading from './Loading'
import NavBar from './NavBar'

const axios = require('axios')


function Dashboard() {
    const [userSub, setUserSub] = useState("")
    const [username, setUsername] = useState("")


    const {user, getAccessTokenSilently} = useAuth0();

    const setAccessParams = async () => {
        const domain = "mymedi.us.auth0.com";
        try {
            console.log("Name:", user.name)
            const accessToken = await getAccessTokenSilently({
                audience: `https://medi/api`,
                // scope: "edit:coupons",
            });
            
            console.log("Access Token:", accessToken)
          } catch (e) {
            console.log(e)
            console.log(e.message);
          }
    };
    

    useEffect(() => {
        const sub = user.sub.split('|')[1]
        setUserSub(sub)
        setAccessParams()
    }, [])

    useEffect(() => {
        if (userSub === "") return;

        // // Query database for whether user exists
        // axios.get(`/api/users/auth/${userSub}`, {validateStatus: () => true})
        //      .then(res => {
        //         // If user does not exist, create user
        //         if (res.status === 404) {
        //             axios.post('/api/users', {
        //                 name: user.name, 
        //                 email: user.email, 
        //                 authID: userSub
        //             })
        //                 .then(r => {
        //                     localStorage.setItem("id", r.data._id)
        //                 })
        //         } else {
        //             localStorage.setItem("id", res.data._id)
        //         }
        //      })

        //     // If no user exists, create user 
        //      .catch(e => {
        //         console.log("catch",e)   

        //      })

    }, [userSub])

    return (
        <div>
            <div style={{margin: "10vh 10vw"}}>
                <h1>Welcome, </h1>
            </div>
            
        </div>
    )
}

export default Dashboard
