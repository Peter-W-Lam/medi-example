const axios = require('axios')
const {toast} = require('react-toastify')

// Try exporting with export keyword
// module.exports = { 
    export const fetchPosts = async (accessToken) => {
        try {
            const res = await axios.get('/api/coupons/', {headers: {'Authorization': `Bearer ${accessToken}`}})
            // console.log(res.data)
            return res.data
        } catch (e) {
            toast.error(e.message)
        }
    }

    export const fetchCouponByID = async (accessToken, couponID) => {
        try {
            const res = await axios.get(`/api/coupons/${couponID}`, {headers: {'Authorization': `Bearer ${accessToken}`}})
            return res.data
        } catch (e) {
            toast.error(e.message)
        }   
    }

    export const fetchOfferByID = async (accessToken, couponID, offerID) => {
        try {
            const res = await axios.get(`/api/coupons/${couponID}/offers/${offerID}`, {headers: {'Authorization': `Bearer ${accessToken}`}})
            return res.data
        } catch (e) {
            toast.error(e.message)
        }   
    }
    export const saveCoupon = async (accessToken, userID, couponID) => {
        try {
            const res = await axios({
                method: 'POST', 
                headers: {'Authorization': `Bearer ${accessToken}`},
                url: `/api/users/${userID}/coupons/`,
                data: {'couponID': couponID} 
            })
            
            return res.data
        } catch (e) {
            toast.error(e.message)
        }   
    } 
    export const unsaveCoupon = async (accessToken, userID, couponID) => {
        try {
            const res = await axios({
                method: 'DELETE',
                headers: {'Authorization': `Bearer ${accessToken}`},
                url: `/api/users/${userID}/coupons/`,
                data: {'couponID': couponID} 
            })
            return res.data
        } catch (e) {
            toast.error(e.message)
        }   
    }   
// }