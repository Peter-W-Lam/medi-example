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

    const filterCards = (query, category, sort) => {
        const filteredByTitle = cardData.filter(item => item.company.includes(query))
        if (category === "all") {
            const sorted = sortCards(filteredByTitle, props.sortType)
            console.log("filteredByTitle:", filteredByTitle)
            setFilteredCardData(sorted)
        } else {
            const filteredByCategory = filteredByTitle.filter(item => item.category === category)
            const sorted = sortCards(filteredByCategory, props.sortType)
            setFilteredCardData(sorted)
        }
    }

    const compareCompany = (a, b) => {
        if (a.company.toUpperCase > b.company.toUpperCase()) {
            console.log(`${a.company.toUpperCase()} greater than ${b.company.toUpperCase()}`)
            return 1;
        } else {
            return -1
        }
    }

    const sortCards = (arr, sort) => {
        if (arr === null) return;

        var sorted = [...arr]
        sorted = sorted.sort(compareCompany)
        console.log("SORTED:", sorted)
        if (sort === "reverse-alpha") {
            sorted = sorted.reverse()
        }
        
        return sorted
    }

    

    useEffect(() => {
        getPosts()
    }, [user])

    useEffect(() => {
        if (cardData) setFilteredCardData([...cardData]);
    }, [cardData])

    useEffect(() => {
        console.log("sort type:", props.sortType)
        if (cardData && filteredCardData) {
           filterCards(props.query, props.category, props.sortType) 
        }
    }, [props.query, props.category, props.sortType, cardData])
    
    useEffect(() => {
        // sortCards()
    }, [filteredCardData])
    

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
