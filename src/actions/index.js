import { FETCH_RENTALS, FETCH_RENTAL_BY_ID_INIT, FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTALS_SUCCESS } from './types'
import axios from 'axios'


const fetchRentalByIdInit = (rental) => {
    return {
        type: FETCH_RENTAL_BY_ID_INIT,
        rental
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
    return async function(dispatch) {
      /* async await with try catch */
      try{
        let {data: rentalById} = await axios.get(`http://localhost:3002/api/v1/rentals/${rentalId}`)
        let rentals = await dispatch(fetchRentalByIdSuccess(rentalById))
        console.log(rentals, 'dispatcher')
        return rentals
      } catch(err){
        console.log(err)
      }
      /* promise */
      // axios.get(`http://localhost:3002/api/v1/rentals/${rentalId}`).then(res => res.data).then(rentals => {
      //   dispatch(fetchRentalByIdSuccess(rentals))
      // }).catch(err => console.log(error))
    }
}