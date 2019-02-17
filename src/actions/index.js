import { LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_RENTALS, FETCH_RENTAL_BY_ID_INIT, FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTALS_SUCCESS, LOGOUT } from './types'
import axios from 'axios'
import AuthService from 'services/auth-service'
import AxiosService from 'services/axios-service'

// RENTALS ACTION --------------------
const fetchRentalByIdInit = (rental) => {
    return {
        type: FETCH_RENTAL_BY_ID_INIT,
        rental
    }
}

const AxiosInstance = AxiosService.getInstance()


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
    AxiosInstance.get('/rentals').then(res => 
      res.data
    ).then(rentals => {
      dispatch(fetchRentalsSuccess(rentals))
  })
  }
}

export const fetchRentalById = (rentalId) => {
    return async function(dispatch) {
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
  return AxiosInstance.post('/users/register', userData)
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
    if (AuthService.isAuthenticated()){
      dispatch(loginSuccess())
    }
  }
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('http://localhost:3002/api/v1/users/auth', userData)
    .then(res => {return res.data})
      .then(token => {
        AuthService.saveToken(token)
      dispatch(loginSuccess())
    }
      )
      .catch(({response}) => {
      dispatch(loginFailure(response.data.errors))})
  }
}

export const logout = () => {
  AuthService.invalidateUser()
  return {
    type: LOGOUT
  }
}

export const createBooking = (booking) => {
  return AxiosInstance.post('/bookings', booking)
        .then(res => res.data)
        .catch(({response}) => Promise.reject(response.data.errors))
}