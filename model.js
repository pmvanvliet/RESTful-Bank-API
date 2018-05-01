/* (c)2018 pmvanvliet */

const mongoose = require('mongoose')

// This defines the collection name in MongoDB
const accountModel = mongoose.model('accounts', {
    name: {
        type: String,
        require: true
    },
    balance: {
        type: Number,
        require: true
    }
})

module.exports = accountModel