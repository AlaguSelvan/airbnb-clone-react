const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const Rental = require('./models/rental')
const FakeDb = require('./fake-db')
const chalk = require('chalk')
const rentalRoutes = require('./routes/rentals')
const PORT = process.env.PORT || 3002
const cors = require('cors')
const app = express()

app.use(cors())

mongoose.connect(config.DB_URI).then(async() => {
    const fakeDb = new FakeDb()
    await fakeDb.seedDb()
})

app.use('/api/v1/rentals',  rentalRoutes)

app.listen(PORT, () => {
    console.log (chalk.blue(`server running on port ${PORT}`))
})