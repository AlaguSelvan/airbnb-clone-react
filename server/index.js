const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config/dev')
const Rental = require('./models/rental')
const User = require('./models/user')
const FakeDb = require('./fake-db')
const chalk = require('chalk')
const rentalRoutes = require('./routes/rentals')
const userRoutes = require('./routes/users')
const bookingRoutes = require('./routes/booking')
const PORT = process.env.PORT || 3002
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(config.DB_URI).then(async() => {
    const fakeDb = new FakeDb()
    // await fakeDb.seedDb()
})

app.use('/api/v1/rentals',  rentalRoutes)
app.use('/api/v1/users',  userRoutes)
app.use('/api/v1/bookings', bookingRoutes)
// app.use(compression)

app.listen(PORT, () => {
    console.log (chalk.blue(`server running on port ${PORT}`))
})