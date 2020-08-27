import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'

function NavLink(props) {
    
    return (
        <Link className={props.selected ? 'NavLink selected' : 'NavLink'}
              to={props.to} 
              onClick={props.onClick}>
                <img className="svg" src={props.img} />
                <h4>{props.name}</h4>
        </Link>
        
    )
}

export default NavLink
