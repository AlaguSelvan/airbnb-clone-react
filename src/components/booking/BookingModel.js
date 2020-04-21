import React from 'react'
import Modal from 'react-responsive-modal'
import { BwmResError } from 'components/shared/form/BwmResError'

export function BookingModel(props) {
  const { open, closeModel, booking, confirmModel, errors, rentalPrice } = props;
  console.log(booking)
  return (
    <Modal open={open} onClose={closeModel} little classNames={{ modal: 'booking-modal' }}>
      <h4 className='modal-title title'>Confirm Booking </h4>
      <p className='dates'>{booking.startAt}/{booking.endAt}</p>
      <div className='modal-body'>
      <em>{booking.days}</em> dars /
      <em>{rentalPrice}$</em> per day
      <p>Guests: <em>{booking.guests}</em></p>
      <p>Price: <em>{booking.totalPrice}$ </em></p>
      <p>Do you confirm your booking for selected days?</p>
      </div>
      <BwmResError errors={errors} />
      <div className='modal-footer'>
        <button
          onClick={confirmModel}
        type='button' className='btn btn-bwm'>Confirm</button>
        <button type='button' onClick={closeModel} className='btn btn-bwm'>Cancel</button>
      </div>
    </Modal>

  )
}