import React from 'react'
import { SearchBlack } from '../../../assets'
import './SearchBar.css'
import FilterButton from './FilterButton'

export default function SearchBar(props) {
    const handleInputChange = (e) => {
        props.setSearchQuery(e.target.value)
    }

    return (
        <div className="SearchBar">
            <input onChange={handleInputChange} type="text" placeholder="Search for offers" />
            <FilterButton setSortType={props.setSortType}/>
        </div>
    )
}
