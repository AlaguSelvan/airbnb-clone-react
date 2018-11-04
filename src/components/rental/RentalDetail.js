import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../../actions'



class RentalDetail extends React.Component {
    constructor() {
		super();

		this.state = {
		
		}
	}
componentDidMount() {
    // Dispatch action
    const rentalId = this.props.match.params.id
    this.props.dispatch(actions.fetchRentalById(rentalId))
}
    render() {
        const {rental} = this.props

        if(rental.id) {
            console.log(rental)
            return (
                <div>
                    <h3>{rental.title}</h3>
                    <h3>{rental.city}</h3>
                    <h3>{rental.street}</h3>
                    <h3>{rental.category}</h3>
                    <h3>{rental.description}</h3>
                    <h3>{rental.dailyRate}$</h3>
                    
                </div>
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