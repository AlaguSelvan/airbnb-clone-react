import { LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_RENTALS, FETCH_RENTAL_BY_ID_INIT, FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTALS_SUCCESS } from './types'
import axios from 'axios'
import AuthService from '../services/auth-service'

// RENTALS ACTION --------------------
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
        return rentals
      } catch(err){
      }
      /* promise */
      // axios.get(`http://localhost:3002/api/v1/rentals/${rentalId}`).then(res => res.data).then(rentals => {
      //   dispatch(fetchRentalByIdSuccess(rentals))
      // }).catch(err => console.log(error))
    }
}

// AUTH ACTIONS --------------------

export const register = (userData) => {
  return axios.post('http://localhost:3002/api/v1/users/register', { ...userData })
  .then(
    response => response.data, 
    err => Promise.reject(err.response.data.errors)
  )
}

// export const login = (userData) => {
//   return axios.post('http://localhost:3002/api/v1/users/auth', { ...userData })
//   .then(
//     response => response.data, 
//     err => Promise.reject(err.response.data.errors)
//   )
// }

const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const checkAuthState = () => {
  return dispatch => {
    debugger;
    if (AuthService.isAuthenticated){
      dispatch(loginSuccess)
    }
  }
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('http://localhost:3002/api/v1/users/auth', { ...userData })
    .then(res => {return res.data})
    .then(token => {localStorage.setItem('auth_token', token)
      dispatch(loginSuccess())
    }
      )
      .catch(({response}) => {
      dispatch(loginFailure(response.data.errors))})
  }
}