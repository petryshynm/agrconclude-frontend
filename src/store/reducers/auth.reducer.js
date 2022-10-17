import { AuthTypes } from "../actions/auth/auth.types"

const initialState = { 
    loading: false,
    error: false,
    message: '',
    authentificated: false,
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type){
        case AuthTypes.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                message: ''
            }
        case AuthTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                authentificated: true,
            }
        case AuthTypes.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case AuthTypes.LOGOUT_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                message: ''
            }
        case AuthTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                authentificated: false,
                userRole: ''
            }
        case AuthTypes.LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        default:
            return state
    }
}