/*
Microsoft DEV283x (edX) module 4 assignment.
(c)2018
Author: pmvanvliet
*/

// Import modules
const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
// Define the application characteristics
let app = express()
app.set('port', 3000) // Port 3000
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(errorhandler())

// Create router
const router = require(path.join(__dirname, './router.js'))
app.use('/', router)

// Define the connectivity (be sure MongoDB is running!)
const database = require(path.join(__dirname, './database.js'))
database(() => {
    app.listen(app.get('port'), () => {
        console.log(`Express server is listening on port ${app.get('port')}.`)
    })
})