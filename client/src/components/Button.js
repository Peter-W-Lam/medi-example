import React from 'react'
import './Button.css'
function Button(props) {
    return (
        <button 
            className="Button"
            onClick={props.onClick}
            id={props.id}
        >{props.title}</button>
    )
}

export default Button
