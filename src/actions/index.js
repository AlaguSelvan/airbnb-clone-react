import { FETCH_RENTALS, FETCH_RENTAL_BY_ID_INIT, FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTALS_SUCCESS } from './types'
import axios from 'axios'


const fetchRentalByIdInit = () => {
    return {
        type: FETCH_RENTAL_BY_ID_INIT
    }
}

const fetchRentalByIdSuccess = (rental) => {
    return {
        type: FETCH_RENTAL_BY_ID_SUCCESS,
        rental
    }
}

const fetchRentalsSuccess = (rentals) => {
  return{
    type: FETCH_RENTALS_SUCCESS,
    rentals
  }
}

export const fetchRentals = () => {
  return dispatch => {
    axios.get('http://localhost:3002/api/v1/rentals').then(res => 
      res.data
    ).then(rentals => {
      console.log(rentals)
      dispatch(fetchRentalsSuccess(rentals))
  })
  }
}

export const fetchRentalById = (rentalId) => {
    return function(dispatch) {
      axios.get(`http://localhost:3002/api/v1/rentals/${rentalId}`).then(res => res.data).then(rentals => {
        dispatch(fetchRentalByIdSuccess(rentals))
      })
    }
}