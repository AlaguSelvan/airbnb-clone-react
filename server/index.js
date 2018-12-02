const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const Rental = require('./models/rental')
const FakeDb = require('./fake-db')

const rentalRoutes = require('./routes/rentals')

mongoose.connect(config.DB_URI).then(() => {
    const fakeDb = new FakeDb()
    fakeDb.seedDb()
})
const app = express()

app.use('/api/v1/rentals',  rentalRoutes)

const chalk = require('chalk')

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log (chalk.blue(`server running on port ${PORT}`))
})