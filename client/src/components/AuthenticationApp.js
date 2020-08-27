import React, {useState, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './pages/Dashboard'
import AdminPanel from './AdminPanel'
import NavBar from './components/navbar/NavBar'
import Profile from './pages/Profile'
import SavedOffers from './pages/SavedOffers'
import Settings from './pages/Settings'
import Support from './pages/Support'
import CouponCard from './components/dashboard/CouponCard'
import OfferCard from './components/dashboard/OfferCard'

// AuthenticationApp.js
// Parent component for all routes that require authentication to be viewed. 
// Makes call to user, stores it in state, and passes down to other components
const AuthenticationApp = (props) => {
    const [storedUser, setStoredUser] = useState({})
    const domain = "mymedi.us.auth0.com";
    const { user, getAccessTokenSilently } = useAuth0();

    const getUserID = async () => {
            // // Query database for whether user exists
        axios.get(`/api/users/auth/${storedUser.sub}`, {
            validateStatus: () => true,
            headers: {
                'Authorization': `Bearer ${storedUser.accessToken}`
            }})
             .then(res => {
                // If user does not exist, create user
                if (res.status === 404) {
                    axios({
                        method: 'POST', 
                        url: '/api/users', 
                        headers: {
                            'Authorization': `Bearer ${storedUser.accessToken}`
                        }, 
                        data: {
                            name: user.name, 
                            email: user.email, 
                            authID: storedUser.sub
                        }
                    }).then(r => {
                        setStoredUser({
                            ...storedUser, 
                            ...user,
                            ...r.data
                            // id: r.data._id
                        })
                    })
                    .catch(e => console.log(e.message))
                } else {
                    setStoredUser({
                        ...storedUser, 
                        ...user,
                        ...res.data
                        // id: res.data._id
                    })
                }
             })
            // If no user exists, create user 
             .catch(e => {
                console.log("catch",e)   

             })
        
    }

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
                ...user,
                accessToken: APIaccessToken, 
                role: app_metadata.role
            });
          
        } catch (e) {
            toast.error(e.message, {
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });


            console.log(e.message);
          }
    };


    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        if (storedUser.accessToken && !storedUser.id) {
            
            getUserID()
        }
    }, [storedUser.accessToken])

    // testing only
    useEffect(() => {
        console.log("Updating storedUser:", storedUser)
    }, [storedUser])
    // Does exact apply to both offer and coupon routes?
    return(
        <div className="mainApp">
            <ToastContainer />
            <NavBar role={storedUser.role}/>
            {/* <Switch> */}
                <Route path="/api/home">
                    <Dashboard user={storedUser}/>
                </Route>
                <Route path="/api/profile">
                    <Profile user={storedUser} />
                </Route>
                <Route path="/api/coupons/:couponID/offer/:offerID" exact>
                    <OfferCard user={storedUser}/>
                </Route>
                <Route path="/api/coupons/:couponID" exact>
                    <CouponCard user={storedUser}/>
                </Route>
                <Route path="/api/saved">
                    <SavedOffers user={storedUser}/>
                </Route>
                <Route path="/api/settings">
                    <Settings user={storedUser}/>
                </Route>
                <Route path="/api/support">
                    <Support user={storedUser} />
                </Route>
                {storedUser.role === 'admin' && 
                <Route path="/api/admin" render={(routeProps) => (
                    <AdminPanel 
                        {...routeProps} 
                        {...props} 
                        user={storedUser}
                    />
                )} />}
            {/* </Switch> */}
        </div>
        
    )
}

export default AuthenticationApp