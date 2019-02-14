const Booking = require('../models/booking')
const Rental = require('../models/rental')
const { normalizeErrors } = require('../helpers/mongoose')
const moment = require('moment')

exports.createBooking = (req, res) => {
    const { startAt, endAt, days, guests, totalPrice, rental } = req.body;
    const user = res.locals.user;
    console.log(user, user.id)
    const booking = new Booking({startAt, endAt, totalPrice, totalPrice, guests, days})
    Rental.findById(rental._id)
    .populate('bookings')
    .populate('user')
    .exec(function(err, foundRental) {
		console.log(foundRental)
        if (err) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) })
        }
        if (foundRental.user.id === user.id) {
					return res.status(422).send({errors: [{title: 'Invalid User!', detail: "cannot create booking on your Rental!"}]})
				}
				if(isValidBooking(booking, foundRental)){
					console.log(booking)
					console.log(foundRental)
					foundRental.bookings.push(booking)
					foundRental.save()
					booking.save()
					// update rental, update user
					return res.json({'created': true})
				} else {
					return res.status(422).send({ errors: [{ title: 'Invalid Booking!', detail: "Choosen dates are already taken!" }] })
				}
        // check here for valid booking 
        return res.json({booking, foundRental})
    })
    // res.json({'createBooking': 'ok'})
}

function isValidBooking(proposedBooking, rental){
	let isValid = true;
	if (rental.bookings && rental.bookings.length > 0) {
		let isValid = rental.bookings.every((booking)=>{
			const proposedStart = moment(proposedBooking.startAt);
			const proposedEnd = moment(proposedBooking.endAt);

			const actualStart = moment(booking.startAt);
			const actualEnd = moment(booking.endAt);

			if((actualStart < proposedStart && actualEnd < proposedEnd) || (proposedEnd < actualEnd && proposedStart < actualStart)) {
				return true;
			} else {
				return false;
			}
		})

	}
	return isValid
}