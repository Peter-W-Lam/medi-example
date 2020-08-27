const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {offerSchema} = require('./Offer')

const couponSchema = new Schema({
    company: String,
    logo: String,
    shortDescription: String,
    companyDescription: String, 
    category: String,
    offers: [offerSchema]
})

const Coupon = mongoose.model('Coupon', couponSchema)

module.exports = Coupon