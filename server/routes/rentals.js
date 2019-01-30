const express = require('express')
const router = express.Router()
const Rental = require('../models/rental')
const UserCtrl = require('../controllers/user')

router.get('/secret', UserCtrl.authMiddleware, async(req, res) => {
    await res.json({"secret": true})
})

router.get('', (req, res) => {
    Rental.find({}, (err, foundRentals) => {
       return res.json(foundRentals)
    })
})

router.get('/:id', async(req, res) => {
  const rentalId = await req.params.id
    Rental.findById(rentalId, (err, foundRental) => {
        if (err) {
            res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could Not Find Rental'}]})
        } else {
            return res.json(foundRental)
        }
    })
})

module.exports = router