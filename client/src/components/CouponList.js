import React, {useState, useEffect} from 'react'
import CouponCard from './CouponCard'
import axios from 'axios'


function CouponList() {
    const [couponData, setCouponData] = useState(null)
    const [listItems, setListItems] = useState(null)
    useEffect(() => {
        axios.get('/api/coupons')
             .then(res => {
                 const list = res.data.map(c => (
                     <CouponCard 
                        key={c._id}
                        title={c.companyName}
                        shortDescription={c.shortDescription}
                        offerText="To come..."
                     />
                 ))
                 console.log(list)
                 setCouponData(res.data)
                 setListItems(list)
             })
             .catch(e => console.log('Error:', e))
    },[])

    

    return (
        <div className="CouponList">
            {listItems}
        </div>
    )
}

export default CouponList
