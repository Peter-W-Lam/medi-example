import React, { useState, useEffect, useContext } from 'react'
import Card from './Card.js'
import './CardList.css'
import {fetchPosts} from '../../../api/fetchPosts'
import {UserContext} from '../../context/UserContext'

export default function CardList(props) {
    // TODO: Fetch card data here and store in variable
    
    const [cardData, setCardData] = useState(null)
    const [filteredCardData, setFilteredCardData] = useState(null)
    const [user, setUser] = useContext(UserContext)

    const getPosts = async () => {
        if (user.accessToken) {
            fetchPosts(user.accessToken)
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
    }, [user])

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
            {filteredCardData && filteredCardData.map(item => (
                <Card 
                    img={item.logo}
                    name={item.company}
                    tagline={item.shortDescription}
                    id={item._id}
                    key={item._id}
                    {...item} />
            ))}
        </div>
    )
}
