import React from 'react'
import './Step.css'

export default function Step(props) {
    return (
        <div className="Step">
            <span className="num">
                <p>{props.num}</p>
            </span>
            <p className="text">{props.text}</p>
        </div>
    )
}
