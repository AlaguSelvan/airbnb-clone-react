const express = require('express')
const router = express.Router()
const Rental = require('../models/rental')
const User = require('../models/user')
const UserCtrl = require('../controllers/user')
const { normalizeErrors } = require('../helpers/mongoose')


router.get('/manage', UserCtrl.authMiddleware, function (req, res) {
  const user = res.locals.user

  Rental.where({ user })
    .populate('bookings')
    .exec((err, foundRentals) => {
      if (err) {
        return res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could Not Find Rental' }] });
      }
      return res.json(foundRentals)
    })
})


router.get('/secret', UserCtrl.authMiddleware, async(req, res) => {
    await res.json({"secret": true})
})

router.get('/:id', async (req, res) => {
  const rentalId = await req.params.id

  Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function (err, foundRental) {
      if (err || !foundRental) {
        return res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could Not Find Rental' }] });
      }
      return res.json(foundRental);
    })
})


router.delete('/:id', UserCtrl.authMiddleware, (req, res) => {
  const user = res.locals.user
  Rental.findById(req.params.id)
        .populate('user', '_id')
        // provide more info with populate query when start time is greater than current time
        .populate({
          path: 'bookings',
          select: 'startAt',
          match: {
            startAt: {
              $gt: new Date()
            }
          }
        })
        .exec((err, foundRental) => {
          console.log(foundRental)
            if(err) {
              return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }
          if (user.id !== foundRental.user.id) {
            return res.status(422).send({ errors: [{ title: 'Invalid User!', detail: 'you are not owner' }] });
          }
          if (foundRental.bookings.length > 0) {
            return res.status(422).send({ errors: [{ title: 'active Bookings!', detail: 'Cannot delete rental with active bookings!' }] });
          }
          foundRental.remove(function(err) {
            if (err) {
              return res.status(422).send({ errors: normalizeErrors(err.errors) });
            }
            return res.json({
              'status': 'deleted'
            })
          })
        })
})

router.post('', UserCtrl.authMiddleware, (req, res) => {
  const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body
  const user = res.locals.user
  const rental = new Rental({ title, city, street, category, image, shared, bedrooms, description, dailyRate})
  rental.user = user
  Rental.create(rental, (err, newRental) => {
    if (err) {
      return res.status(422).send({ errors: [{ title: 'Rental Error!', detail: 'Could Not Find Rental' }] });
    }

    User.update({_id: user.id}, {$push: {rentals: newRental}})
    return res.json(newRental)
  })
})

router.get('', (req, res) => {
  const city = req.query.city

  const query = city ? {city: city.toLowerCase()} : {}

    Rental.find(query)
      .select('-bookings')
      .exec((err, foundRentals) => {
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)})
        }
        if (city && foundRentals.length === 0) {
          return res.status(422).send({ errors: [{ title: 'No Rentals Found!', detail: `There are no rentals for city ${city}` }] })
        }
        return res.json(foundRentals)
      })

})


module.exports = router