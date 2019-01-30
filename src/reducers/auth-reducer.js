import { LOGIN_SUCCESS, LOGIN_FAILURE, } from '../actions/types'

const INITIAL_STATE = {
    isAuth: false,
    token: '',
    errors: []
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, isAuth: true, token: action.token, errors: [] }
        case LOGIN_FAILURE:
            return { ...state, isAuth: false, errors: [] }
        default:
            return state
    }
}
