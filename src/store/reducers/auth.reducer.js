import { getProfile } from "../../services/utils";
import { AuthTypes } from "../actions/auth/auth.types"

const initialState = { 
    loading: false,
    error: false,
    message: '',
    authentificated: false,
    profile: {
        gender: '...',
        phone: '...',
        birthday: '...'
    }
}

const emailKey = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';

export const AuthReducer = (state = initialState, action) => {
    switch (action.type){
        case `${AuthTypes.LOGIN}_REQUEST`:
        case `${AuthTypes.LOGOUT}_REQUEST`:
        case `${AuthTypes.EDIT_PROFILE}_REQUEST`:
        case `${AuthTypes.GET_PROFILE}_REQUEST`:
            return {
                ...state,
                loading: true,
                error: false,
                message: ''
            }
        case `${AuthTypes.LOGIN}_FAILURE`:
        case `${AuthTypes.LOGOUT}_FAILURE`:
        case `${AuthTypes.EDIT_PROFILE}_FAILURE`:
        case `${AuthTypes.GET_PROFILE}_FAILURE`:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case `${AuthTypes.GET_PROFILE}_SUCCESS`:
            return {
                ...state,
                loading: false,
                error: false,
                message: '',
                profile: {
                    ...state.profile,
                    ...action.payload
                }
            }
        case `${AuthTypes.LOGIN}_SUCCESS`:
            const googleProfile = getProfile(action.payload)
            googleProfile.email = googleProfile[emailKey]
            return {
                ...state,
                loading: false,
                error: false,
                authentificated: true,
                profile: {
                    ...state.profile,
                    ...googleProfile
                }
            }
        case `${AuthTypes.LOGOUT}_SUCCESS`:
            return {
                ...state,
                loading: false,
                error: false,
                authentificated: false,
                profile: initialState.profile,
            }
        case `${AuthTypes.EDIT_PROFILE}_SUCCESS`:
            return {
                ...state,
                loading: false,
                error: false,
                message: ''
            }
        default:
            return state
    }
}