import React, {useState} from 'react'
import {Button, Modal, Form, FormGroup, Input, Label} from 'reactstrap'
import './FilterButton.css'

export default function FilterButton(props) {
    const [open, isOpen] = useState(false)
    const [selected, setSelected] = useState('newest')
    const handleChange = e => {
        props.setSortType(e.target.name)
        setSelected(e.target.name)
    }

    const onSubmit = e => {
        e.preventDefault()
        isOpen(!open)
    }


    return (
        <div className="FilterButton">
            <button className="filter-btn" onClick={() => isOpen(!open)}>Filter</button>
            <Modal isOpen={open} toggle={() => isOpen(!open)} className="filter-modal" size="sm">
                <form onChange={handleChange} className="filter-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="radio" name="alpha" id="nealphawest" checked={selected === 'alpha'}/>
                        <label htmlFor="alpha">A - Z</label>
                    </div>
                    <div className="form-group">
                        <input 
                            type="radio" 
                            name="reverse-alpha" 
                            id="reverse-alpha"  
                            checked={selected === 'reverse-alpha'}/>
                        <label htmlFor="reverse-alpha">Z - A</label>
                    </div>
                    <Button>Apply</Button>
                </form>
            </Modal>
        </div>
    )
}
