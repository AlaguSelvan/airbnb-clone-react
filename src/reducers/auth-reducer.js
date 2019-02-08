import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types'

const INITIAL_STATE = {
    isAuth: false,
    redirect: false,
    errors: []
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, isAuth: true, redirect: true, errors: [] }
        case LOGIN_FAILURE:
            return { ...state, isAuth: false, errors: action.errors }
        case LOGOUT:
            return { ...state, isAuth: false}
        default:
            return state
    }
}
