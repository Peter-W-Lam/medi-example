const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    }, 
    authID: {
        type: String
        // required: true
    },
    email: {
        type: String, 
        require: true,
        unique: true
    },
    isVerified: {
        type: Boolean, 
        default: false
    },
    healthcareSystem: {
        type: String
    },
    healthcareRole: {
        type: String
    },
    healthcareEmail: {
        type: String
    },
    // List of offer IDs
    savedCoupons: {
        type: [String]
    }, 
    date: {
        type: Date, 
        default: Date.now()
    }, 
    avatar: String, 
    dateOfBirth: {
        type: Date
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User