import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from 'actions'
import * as moment from 'moment'
import { pretifyDate, toUpperCase } from 'helpers'

class BookingManage extends PureComponent {

	componentDidMount() {
		this.props.dispatch(actions.fetchUserBookings());
	}

  render() {
		const { data: bookings, isFetching } = this.props.userBookings
		console.log(isFetching)
    return (
    <section id='userBookings'>
        <h1 className='page-title'>My Bookings</h1>
        <div className='row'>
					{bookings.map((booking, index) => 
          <div key={index} className='col-md-4'>
            <div className='card text-center'>
              <div className='card-header'>
                {booking.rental.category ? booking.rental.category : 'Deleted Rental' }
    </div>
              <div className='card-block'>
              {
                booking.rental &&
                <>
											<h4 className='card-title'>{toUpperCase(booking.rental.title)} - {toUpperCase(booking.rental.city)}</h4>
                  <p className='card-text booking-desc'>{booking.rental.description}</p>
                </>
              }
									<p className='card-text booking-days'>{pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} | {booking.days} days</p>
							<p className='card-text booking-price'><span>Price: </span> <span className='booking-price-value'>{booking.totalPrice} $</span></p>
							{  booking.rental &&
							<Link className='btn btn-bwm' to={`/rentals/${booking.rental._id}`}>Go to Rental</Link>
							}
						</div>
              <div className='card-footer text-muted'>
									{pretifyDate(booking.createdAt)}
    </div>
            </div>
          </div>
            )}
            </div>
				{!isFetching && bookings.length === 0 && 
				<div className='alert alert-warning'>
            You have no bookings created go to rentals section and book your place today.
								<Link
								 className='btn btn-bwm' to='/rentals'>Available Rental</Link>
        </div>
						 } 
    </section>

    )
  }
}

function mapStateToProps(state) {
    return {
      userBookings: state.userBookings
    }
}


export default connect(mapStateToProps)(BookingManage)
