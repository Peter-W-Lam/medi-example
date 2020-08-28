import React from 'react'

export default function CategoriesButton(props) {
    return (
        <div className="form-group" className={props.selected === props.category ? 'form-group selected' : 'form-group'}>
            <input 
                type="radio" 
                className={props.selected === props.category ? 'selected' : ''}
                id={props.category}
                name="category" 
                value={props.category} 
                checked={props.selected === props.category} />
            <label htmlFor={props.category}>
                {props.customLabel ? props.customLabel : props.category}
            </label>
        </div>
    )
}
