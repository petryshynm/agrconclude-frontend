import { UserTypes } from "../actions/user/user.types"

const initialState = { 
    loading: false,
    error: false,
    message: '',
    contracts: [],
    users: [],
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type){
        case UserTypes.GET_USERS_REQUEST:
        case UserTypes.GET_USER_CONTRACTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                message: ''
            }
        case UserTypes.GET_USERS_FAILURE:
        case UserTypes.GET_USER_CONTRACTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload
            }
        case UserTypes.GET_USER_CONTRACTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                contracts: action.payload
            }
        case UserTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                users: action.payload
            }
        default:
            return state
    }
}