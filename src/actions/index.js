import { FETCH_USER_RENTALS_INIT, FETCH_USER_RENTALS_SUCCESS, FETCH_USER_RENTALS_FAIL, FETCH_USER_BOOKINGS_INIT, FETCH_USER_BOOKINGS_SUCCESS, FETCH_USER_BOOKINGS_FAIL, LOGIN_SUCCESS, FETCH_RENTALS_INIT, FETCH_RENTALS_FAIL, LOGIN_FAILURE, FETCH_RENTALS, FETCH_RENTAL_BY_ID_INIT, FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTALS_SUCCESS, LOGOUT } from './types'
import axios from 'axios'
import AuthService from 'services/auth-service'
import AxiosService from 'services/axios-service'
import authService from '../services/auth-service';

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

const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT
  }
}

const fetchRentalsFail = (errors) => {
  return {
    type: FETCH_RENTALS_FAIL,
    errors
  }
}

export const fetchRentals = (city) => {
  const url = city ? `/rentals?city=${city}` : '/rentals'
  return dispatch => {
    dispatch(fetchRentalsInit());
    AxiosInstance.get(url).then(res => {
      return res.data
    }).then(rentals => {
      return dispatch(fetchRentalsSuccess(rentals))})
      .catch(({response}) => {
        dispatch(fetchRentalsFail(response.data.errors))
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

// Create Rental
export const createRental = (rentalData) => {
  return AxiosInstance.post('/rentals', rentalData)
    .then(
      response => response.data,
      err => Promise.reject(err.response.data.errors)
    )
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
  const username = authService.getUsername()
  return {
    type: LOGIN_SUCCESS,
    username
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


// Use Booking Actions

export const fetchUserBookingsInit = () => {
  return {
    type: FETCH_USER_BOOKINGS_INIT
  }
}

export const UserBookingSuccess = (userBookings) => {
  console.log(userBookings)
  // debugger;
  return {
    type: FETCH_USER_BOOKINGS_SUCCESS,
    userBookings
  }
}
export const UserBookingFail = (errors) => {
  return {
    type: FETCH_USER_BOOKINGS_FAIL,
    errors
  }
}

export const fetchUserBookings = (booking) => {
  return dispatch => {
    dispatch(fetchUserBookingsInit)
    AxiosInstance
              .get('/bookings/manage', booking)
              .then(res => res.data)
              .then(userBookings => dispatch(UserBookingSuccess(userBookings)))
      .catch((_) =>  dispatch(UserBookingFail('err')))
  }
}