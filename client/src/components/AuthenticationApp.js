import React, {useState, useEffect, useContext} from 'react'
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

import {UserContext} from './context/UserContext'
import {getUserID, getAPItoken, getManagementToken} from '../api/user'
import {setWithExpiry, getWithExpiry} from '../api/utils'
import NoMatch from './pages/NoMatch'

// AuthenticationApp.js
// Parent component for all routes that require authentication to be viewed. 
// Makes call to user, stores it in state, and passes down to other components
const AuthenticationApp = (props) => {
    const [storedUser, setStoredUser] = useState({})
    const [user, setUser] = useContext(UserContext)
    const domain = "mymedi.us.auth0.com";
    const { user: auth0User, getAccessTokenSilently } = useAuth0();


    const fetchAuth0Data = async (auth0User, getAccessTokenSilently) => {
        if (auth0User && getAccessTokenSilently) {
            const data = await getAPItoken(domain, getAccessTokenSilently, auth0User.sub)
            const adminInfo = await getManagementToken(domain, getAccessTokenSilently, auth0User.sub)
            
            setUser({...user, ...auth0User, ...data, ...adminInfo})
            setStoredUser({...storedUser, ...auth0User, ...data, ...adminInfo})
            setWithExpiry("user", {...user, ...auth0User, ...data, ...adminInfo}, 14000000)
        }
    }

    const fetchUserID = async () => {
        if (user.accessToken && user.sub && !user.id) {
            getUserID(user.accessToken, user.sub, user.name, user.email)
            .then(data => {
                setUser({...user, ...data})
                setStoredUser({...storedUser, ...data})
            })
        }
    }

    

    const onPageLoad = async () => {
        
        // If the user exists in localStorage already, exit, and set user accordingly 
        // in state
        if (getWithExpiry("user")) {
            const localUser = getWithExpiry("user");
            setUser(localUser)
            setStoredUser(localUser)
        } else { // Else, call the API to get this data again
            fetchAuth0Data(auth0User, getAccessTokenSilently)
        }
    }

    useEffect(() => {
        onPageLoad()
    }, [])

    useEffect(() => {
        fetchUserID()
    }, [user.accessToken])

    // testing only
    // useEffect(() => {
    //     console.log("Updating storedUser:", storedUser)
    //     console.log("Updating user:", user)
    // }, [user])
    
    // Does exact apply to both offer and coupon routes?
    return(
        <div className="mainApp">
            <ToastContainer />
            <NavBar />
            <Switch>
                <Route path="/api/home" component={Dashboard} />
                <Route path="/api/profile" component={Profile} />
                <Route path="/api/coupons/:couponID/offer/:offerID" exact>
                    <OfferCard user={storedUser}/>
                </Route>
                <Route path="/api/coupons/:couponID" exact>
                    <CouponCard user={storedUser}/>
                </Route>
                <Route path="/api/saved" component={SavedOffers} />
                <Route path="/api/settings" component={Settings}/>
                <Route path="/api/support">
                    <Support user={storedUser} />
                </Route>
                {user.role && (user.role === 'admin' && 
                <Route path="/api/admin" render={(routeProps) => (
                    <AdminPanel 
                        {...routeProps} 
                        {...props} 
                        user={storedUser}
                    />
                )} />)}
                <Route path="*" component={NoMatch} />
            </Switch>
        </div>
        
    )
}

export default AuthenticationApp