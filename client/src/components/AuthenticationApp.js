import React, {useState, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'

import Dashboard from './Dashboard'
import AdminPanel from './AdminPanel'
import NavBar from './NavBar'
// AuthenticationApp.js
// Parent component for all routes that require authentication to be viewed. 
// Makes call to user, stores it in state, and passes down to other components
const AuthenticationApp = (props) => {
    const [storedUser, setStoredUser] = useState({})
    const domain = "mymedi.us.auth0.com";
    const { user, getAccessTokenSilently } = useAuth0();

    const fetchUserData = async () => {
        try {
            // Fetch Access token for API calls
            const APIaccessToken = await getAccessTokenSilently({
                audience: `https://medi/api`
            });

            // Fetch user role 
            const managementAccessToken = await getAccessTokenSilently({
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user",
            });
        
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        
            const metadataResponse = await fetch(userDetailsByIdUrl, {
                headers: {
                    Authorization: `Bearer ${managementAccessToken}`,
                },
            });
            const { app_metadata } = await metadataResponse.json();

            // Update state with information
            setStoredUser({
                ...storedUser, 
                accessToken: APIaccessToken, 
                sub: user.sub, 
                role: app_metadata.role
            });
          
        } catch (e) {
            console.log(e.message);
          }
    };


    useEffect(() => {
        fetchUserData()
    }, [])

    // testing only
    useEffect(() => {
        console.log("Updating storedUser:", storedUser)
    }, [storedUser])

    return(
        <div>
            <NavBar role={storedUser.role}/>
            <Switch>
                <Route path="/api/home">
                    <Dashboard />
                </Route>
                {storedUser.role === 'admin' && 
                <Route path="/api/admin" render={(routeProps) => (
                    <AdminPanel 
                        {...routeProps} 
                        {...props} 
                        user={storedUser}
                    />
                )} />}
            </Switch>
        </div>
        
    )
}

export default AuthenticationApp