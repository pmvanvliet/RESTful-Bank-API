/* (c)2018 pmvanvliet */

const mongoose = require('mongoose')
const connectStr = 'mongodb://localhost:27017/edx-course-db'

module.exports = (callback) => {

    mongoose.Promise = global.Promise
    mongoose.connect(connectStr)
    let db = mongoose.connection

    // Status events
    db.on('connected', () => {
        console.log("Mongoose connected.")
    })
    
    db.on('open', () => {
        callback(mongoose) // Starting Mongoose
    })

    db.on('disconnected', () => {
        console.log("Mongoose disconnected.")
        process.exit(1)
    })

    db.on('error', (error) => {
        console.error(`Mongoose default connection error:  ${error}.`)
        process.exit(1)
    })
}
