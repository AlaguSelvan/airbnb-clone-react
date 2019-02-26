import React, {Component} from 'react'
import {RentalList}  from './RentalList'
import { connect } from 'react-redux'

import * as actions from 'actions'

class RentalSearchListing extends Component {
    constructor() {
        super()
        this.state = {
            searchedCity: ''
        }
    }

    componentDidUpdate(prevProps) {
      const currentUrlParam = this.props.match.params.city
      const prevUrlParam = prevProps.match.params.city
      if (currentUrlParam !== prevUrlParam) {
          this.searchRentalsByCity()
      }
    }


	async componentDidMount() {
        await this.searchRentalsByCity()
    }
    searchRentalsByCity = () => {
        const searchedCity = this.props.match.params.city
        this.setState({ searchedCity })
        
        this.props.dispatch(actions.fetchRentals(searchedCity))
    }
    renderTitle = () => {
        console.log(this.props.rentals.data)
        const { errors, data } = this.props.rentals
        const { searchedCity } = this.state
        let title = ''
        if (errors.length > 0) {
            title = `No Rentals for ${searchedCity}`
            title = errors[0].detail
        } else {
            title = `Your Home in City of ${searchedCity}`
        }
        return (
            <h1 className="page-title">{title}</h1>
        )
    }

	render() {

        const { searchedCity } = this.state
    return (
			<section id ="rentalSearchListing">
            {this.renderTitle()}
                <RentalList rentals = {this.props.rentals.data}/>
			</section>
		)
		}
    }
    function mapStateToProps(state) {
        console.log(state.rentals.data)
        return {
            rentals: state.rentals
        }
    }

export default connect(mapStateToProps)(RentalSearchListing)