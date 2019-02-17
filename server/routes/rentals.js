const express = require('express')
const router = express.Router()
const Rental = require('../models/rental')
const UserCtrl = require('../controllers/user')

router.get('/secret', UserCtrl.authMiddleware, async(req, res) => {
    await res.json({"secret": true})
})

router.get('', (req, res) => {
    Rental.find({})
        .select('-bookings')
        .exec((err, foundRentals) => {
        
      return res.json(foundRentals)
    })

    // Rental.find({}, (err, foundRentals) => {
    //    return res.json(foundRentals)
    // })
})

router.get('/:id', async(req, res) => {
  const rentalId = await req.params.id

  Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function(err, foundRental) {
      if (err || !foundRental) {
        return  res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could Not Find Rental' }]});
      }
      return res.json(foundRental);
  })
})

module.exports = router