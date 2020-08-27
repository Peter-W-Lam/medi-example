import React, {useState} from 'react'
import SavedCards from '../components/saved/SavedCards'
import SearchSaved from '../components/saved/SearchSaved'
import SmallSpinner from '../components/SmallSpinner'
function SavedOffers(props) {
    const [query, setQuery] = useState("")

    return (
        <div className="SavedOffers">
            {props.user.savedCoupons ? 
            <>
                <h1>My Saved Offers</h1>
                <SearchSaved setQuery={setQuery}/>
                <SavedCards user={props.user} query={query}/>
            </> :
            <SmallSpinner loading={true}/>
            }
        </div>
    )
}

export default SavedOffers
