const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    headline: String,
    description: String,
    termsAndConditions: String, 
    link: String, 
    code: String
})

const Offer = mongoose.model('Offer', offerSchema)

module.exports = {
    Offer: Offer, 
    offerSchema: offerSchema
}