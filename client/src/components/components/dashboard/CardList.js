import React, { useState, useEffect } from 'react'
import Card from './Card.js'
import './CardList.css'
import {fetchPosts} from '../../../api/fetchPosts'
export default function CardList(props) {
    // TODO: Fetch card data here and store in variable
    
    const [cardData, setCardData] = useState(null)
    const [filteredCardData, setFilteredCardData] = useState(null)
    const getPosts = async () => {
        if (props.user.accessToken) {
            fetchPosts(props.user.accessToken)
            .then(data => setCardData(data))
        }
    }
    const filterCards = (query, category) => {
        const filteredByTitle = cardData.filter(item => item.company.includes(query))
        if (category === "all") {
            setFilteredCardData(filteredByTitle)
        } else {
            const filteredByCategory = filteredByTitle.filter(item => item.category === category)
            setFilteredCardData(filteredByCategory)
        }
    }

    

    useEffect(() => {
        getPosts()
    }, [props.user])

    useEffect(() => {
        if (cardData) setFilteredCardData([...cardData]);
    }, [cardData])

    useEffect(() => {
        if (cardData && filteredCardData) {
           filterCards(props.query, props.category) 
        }
    }, [props.query, props.category, cardData])
    
    

    return (
        <div className="CardList">
            {filteredCardData && filteredCardData.map(item => (<Card 
                user={props.user}
                img={item.logo}
                name={item.company}
                tagline={item.shortDescription}
                id={item._id}
                {...item}
            />))}
        </div>
    )
}
