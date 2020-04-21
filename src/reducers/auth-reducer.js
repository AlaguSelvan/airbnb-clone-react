import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types'

const INITIAL_STATE = {
    isAuth: false,
    redirect: false,
    username: '',
    errors: []
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
          return { ...state, isAuth: true, redirect: true, errors: [], username: action.username }
        case LOGIN_FAILURE:
          return { ...state, isAuth: false, errors: action.errors, username: '' }
        case LOGOUT:
          return { ...state, isAuth: false, username: ''}
        default:
          return state
    }
}
