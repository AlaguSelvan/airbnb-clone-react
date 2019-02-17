import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions'
import RentalDetailInfo from './RentalDetailInfo'
import { RentalMap } from './RentalMap'
import { Booking } from 'components/booking/Booking'
class RentalDetail extends React.Component {
    constructor() {
		super()
		this.state = {
		}
	}
    async componentDidMount(){
        const rentalId = await this.props.match.params.id
        const fetchRentalId = await this.props.dispatch(actions.fetchRentalById(rentalId))
        return fetchRentalId
    }

    render() {
        const {rental} = this.props
        if(rental._id) {
    return (
        <section id='rentalDetails'>
        <div className='upper-section'>
        <div className='row'>
        <div className='col-md-6'>
        <img src={rental.image} alt=''></img>
        </div>
        <div className='col-md-6'>
        {/* <img src={rental.image} alt=''></img> */}
                        {/* <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrxLnlFRsw1gPFZVgdWXdkL1P-pldNvqg&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `360px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        /> */}
        <RentalMap location={`${rental.city},${rental.street}`}/>
        </div>
        </div>
        </div>
        <div className='details-section'>
        <div className='row'>
        <div className='col-md-8'>
          <RentalDetailInfo rental={rental} />
        </div>
        <div className='col-md-4'> 
        <Booking rental={rental} />
        </div>
        </div>
        </div>
        </section>
            )
        } else {
            return (
                    <h1>Loading ...</h1>
            )
        }
    }
}

function mapStateToProps(state) {
	return {
		rental: state.rental.data
	}
}

export default connect(mapStateToProps)(RentalDetail)