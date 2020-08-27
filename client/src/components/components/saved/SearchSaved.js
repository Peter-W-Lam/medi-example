import React from 'react'
import {Search} from '../../../assets'

export default function SearchSaved(props) {
    const handleChange = e => {
        props.setQuery(e.target.value)
    }

    return (
        <div className="SearchSaved">
            <input type="text" value={props.query} placeholder="Search offers" onChange={handleChange}/>
            <button className="filter-btn">Filter</button>
        </div>
    )
}
