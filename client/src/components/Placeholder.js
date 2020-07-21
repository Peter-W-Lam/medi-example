import React, {useEffect, useState} from 'react'
import Button from './Button'
import {useAuth0} from "@auth0/auth0-react"

function Placeholder() {
    
    const { logout } = useAuth0();
    const [coupons, setCoupons] = useState([])
    const [username, setUsername] = useState("")
    const [metadata, setMetadata] = useState(null)
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchAPI = async () => {
            // const res = await fetch('/api/users/5f0f6b0c07ae891ce13a834d')
            // const resJSON = await res.json()
            // console.log(resJSON);
            setUsername(user.email)
        }
        const getUserMetadata = async () => {
        
            const domain = "mymedi.us.auth0.com";
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2`,
                    scope: "read:current_user",
                });

                console.log("Access Token: ", accessToken)
                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
                console.log("userDetailsByIdUrl", userDetailsByIdUrl);
                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                    Authorization: `Bearer ${accessToken}`,
                    },
                });
            
                const { user_metadata } = await metadataResponse.json();
            
                setMetadata(user_metadata);
            } catch (e) {
              console.log(e.message);
            }
        }


        fetchAPI()
        getUserMetadata()

    })
    return (
        <div style={{margin: "10vh 10vw"}}>
            <h1>Welcome, {username}</h1>
            <h2>Your coupons:</h2>
            <ul>
                {coupons.map(coupon => (<li>{coupon}</li>))}
            </ul>
            <h4>User Metadata</h4>
            {metadata ? 
            (<pre>{JSON.stringify(metadata, null, 2)}</pre>):
            (<p>No user metadata found</p>)}
            
            <Button onClick={() => logout()} title="Log out"/>
        </div>
    )
}

export default Placeholder
