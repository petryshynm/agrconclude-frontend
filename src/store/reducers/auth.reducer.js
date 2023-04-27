import { getProfile } from "../../services/utils";
import { AuthTypes } from "../actions/auth/auth.types"

const initialState = { 
    loading: false,
    error: false,
    message: '',
    authentificated: false,
    profile: null
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type){
        case `${AuthTypes.LOGIN}_REQUEST`:
        case `${AuthTypes.LOGOUT}_REQUEST`:
            return {
                ...state,
                loading: true,
                error: false,
                message: ''
            }
        case `${AuthTypes.LOGIN}_FAILURE`:
        case `${AuthTypes.LOGOUT}_FAILURE`:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case `${AuthTypes.LOGIN}_SUCCESS`:
            return {
                ...state,
                loading: false,
                error: false,
                authentificated: true,
                profile: getProfile(action.payload)
            }
        case `${AuthTypes.LOGOUT}_SUCCESS`:
            return {
                ...state,
                loading: false,
                error: false,
                authentificated: false,
                profile: null
            }
        default:
            return state
    }
}