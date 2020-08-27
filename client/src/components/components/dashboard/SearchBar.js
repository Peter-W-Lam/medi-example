import React from 'react'
import { SearchBlack } from '../../../assets'
import './SearchBar.css'

export default function SearchBar(props) {
    const handleInputChange = (e) => {
        props.setSearchQuery(e.target.value)
    }

    return (
        <div className="SearchBar">
            <input onChange={handleInputChange} type="text" placeholder="Search for offers" />
            <button className="filter-btn">Filter</button>
        </div>
    )
}
