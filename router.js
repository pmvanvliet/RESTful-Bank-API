/* (c)2018 pmvanvliet */

const path = require('path')
const express = require('express')
const router = express.Router()

// Import the Mongoose data model
let Account = require(path.join(__dirname, './model.js'))

router.get('/', (req, res, next) => {
    console.log("Routing service is alive.")
    return res.status(204).end()
})

router.get('/accounts', (req, res, next) => {
    Account.find({}, null, {
        sort: {
            _id: -1
        }
    }, (error, accounts) => {
        if (error) return next(error)
        res.status(200).send(accounts)
    })
})

router.get('/accounts/:id', (req, res, next) => {
    Account.findById(req.params.id, (error, account) => {
        if (error) return next(error)
        res.status(200).send(account.toJSON())
    })
})

router.post('/accounts', (req, res, next) => {
    let newAccount = new Account(req.body)
    newAccount.save((error, results) => {
        if (error) return next(error)
        res.status(201).send(results)
    })
})

router.put('/accounts/:id', (req, res, next) => {
    Account.findById(req.params.id, (error, account) => {
        if (error) return next(error)
        if (req.body.name) account.name = req.body.name
        if (req.body.balance) account.balance = req.body.balance
        account.save((err, results) => {
            if (err) return next(err)
            res.status(200).send(results)
        })
    })
})

router.delete('/accounts/:id', (req, res, next) => {
    Account.findById(req.params.id, (error, account) => {
        if (error) return next(error)
        account.remove((err, results) => {
            if (err) return next(err)
            res.status(204).send(results)
        })
    })
})

module.exports = router