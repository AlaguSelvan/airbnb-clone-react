import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from 'actions'

class BookingManage extends Component {

	componentDidMount() {
		this.props.dispatch(actions.fetchUserBookings());
	}

  render() {
      const { userBookings } = this.props
      console.log(userBookings)
    return (
    <section id='userBookings'>
        <h1 className='page-title'>My Bookings</h1>
        <div className='row'>
        { userBookings.data.map((booking, index) => <a key={index}>
        {booking.startAt} - {booking.endAt}
        </a>)}
            <div className='col-md-4'>
                <div className='card text-center'>
                    <div className='card-header'>
                        Rental Category
    </div>
                    <div className='card-block'>
                        <h4 className='card-title'> Rental Title - Rental City</h4>
                        <p className='card-text booking-desc'>Rental Description</p>
                        <p className='card-text booking-days'>2018/04/04 - 2018/04/06 | 2 days</p>
                        <p className='card-text booking-price'><span>Price: </span> <span className='booking-price-value'>205 $</span></p>
                        <Link className='btn btn-bwm' to='rental detail'>Go to Rental</Link>
                    </div>
                    <div className='card-footer text-muted'>
                        Created 2018/03/03
    </div>
                </div>
            </div>
        </div>
				<div className='alert alert-warning'>
            You have no bookings created go to rentals section and book your place today.
								<Link
								//  style={{ 'margin-left': '10px' }} 
								 className='btn btn-bwm' to='rentals index page'>Available Rental</Link>
        </div>
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
