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
import {getUserID, getAuth0Data} from '../api/user'
import NoMatch from './pages/NoMatch'

// AuthenticationApp.js
// Parent component for all routes that require authentication to be viewed. 
// Makes call to user, stores it in state, and passes down to other components
const AuthenticationApp = (props) => {
    const [storedUser, setStoredUser] = useState({})
    const [user, setUser] = useContext(UserContext)
    const domain = "mymedi.us.auth0.com";
    const { user: auth0User, 
            getAccessTokenSilently, 
            isAuthenticated,
            loginWithRedirect } = useAuth0();
    
    const fetchAuth0Data = async () => {
        if (auth0User && getAccessTokenSilently) {
            const data = await getAuth0Data(domain, getAccessTokenSilently, auth0User.sub)
            setUser({...user, ...auth0User, ...data})
            
            setStoredUser({
                ...storedUser, 
                ...auth0User, 
                ...data
            })
        }
    }

    const fetchUserID = async () => {
        if (storedUser.accessToken && storedUser.sub && !storedUser.id) {
            getUserID(storedUser.accessToken, storedUser.sub, storedUser.name, storedUser.email)
            .then(data => {
                setUser({...user, ...data})
                setStoredUser({...storedUser, ...data})
            })
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchAuth0Data();
        } else {
            loginWithRedirect();
        }
        
    }, [])

    useEffect(() => {
        fetchUserID()
    }, [storedUser.accessToken])

    // testing only
    useEffect(() => {
        console.log("Updating storedUser:", storedUser)
    }, [storedUser])
    
    // Does exact apply to both offer and coupon routes?
    return(
        <div className="mainApp">
            <ToastContainer />
            <NavBar />
            <Switch>
                <Route path="/api/home">
                    <Dashboard />
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
                {storedUser.role && (storedUser.role === 'admin' && 
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