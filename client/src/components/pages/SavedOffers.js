import React, {useState, useContext} from 'react'
import SavedCards from '../components/saved/SavedCards'
import SearchSaved from '../components/saved/SearchSaved'
import SmallSpinner from '../components/SmallSpinner'
import {NoData} from '../../assets'
import {UserContext} from '../context/UserContext'
function SavedOffers(props) {
    const [query, setQuery] = useState("")
    const [user, setUser] = useContext(UserContext)

    return (
        <div className="SavedOffers">
            {user.isVerified != null ? 
                (!user.isVerified ? 
                    <div className="placeholder">
                        <h1>There's nothing here yet</h1>
                        <p>Verify your email and get started browsing offers.</p>
                        <img src={NoData} alt="Woman looking at screen with no data on it" />
                    </div> :
                    (user.savedCoupons.length > 0 ? 
                        <>
                            <h1>My Saved Offers</h1>
                            <SearchSaved setQuery={setQuery}/>
                            <SavedCards user={user} query={query}/>
                        </> : 
                        <div className="placeholder">
                            <h1>There's nothing here yet</h1>
                            <p>Go to your dashboard and save an offer, and it will appear here!</p>
                            <img src={NoData} alt="Woman looking at screen with no data on it" />
                        </div>
                    )
                ) : 
                <SmallSpinner loading={true} />}
        </div>
    )
}

export default SavedOffers
