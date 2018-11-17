const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config/dev')
mongoose.connect(config.DB_URI)

app.get('/rentals', (req, res)=>{
    res.json({
        'success': true
    })
})

const chalk = require('chalk')

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log (chalk.blue(`server running on port ${PORT}`))
})