import React, {useState, useRef} from 'react'
import './Categories.css'
import CategoriesButton from './CategoriesButton'

export default function Categories(props) {
    // const [selected, setSelected] = useState("all")
    const buttonsStart = useRef(null);
    const buttonsEnd = useRef(null);
   
    const handleChange = (e) => {
        props.setSelected(e.target.value)
    }

    return (
        <div className="Categories">
            <div className="buttons">
                <button onClick={() => {buttonsStart.current.scrollIntoView({behavior: "smooth", block: 'nearest', inline: 'start'})}} 
                        className="scrollLeft">&lt;</button>
                <button onClick={() => {buttonsEnd.current.scrollIntoView({behavior: "smooth", block: 'nearest', inline: 'start'})}} 
                        className="scrollRight">&gt;</button>
            </div>
            <form onChange={handleChange}>
                <div style={{ float:"right", clear: "both" }}
                    ref={buttonsStart}>
                </div>
                <CategoriesButton category="all" selected={props.selected}/>
                <CategoriesButton category="fashion" selected={props.selected}/>
                <CategoriesButton category="beauty" selected={props.selected}/>
                <CategoriesButton category="foodanddrink" customLabel="Food &amp; Drink" selected={props.selected}/>
                <CategoriesButton category="healthandfitness" customLabel="Health &amp; Fitness" selected={props.selected}/>
                <CategoriesButton category="lifestyle" selected={props.selected}/>
                <CategoriesButton category="technology" selected={props.selected}/>
                <CategoriesButton category="sports" customLabel="sports &amp; media" selected={props.selected}/>
                <div style={{ float:"right", clear: "both" }}
                    ref={buttonsEnd}>
                </div>
            </form>
        </div>
    )
}
