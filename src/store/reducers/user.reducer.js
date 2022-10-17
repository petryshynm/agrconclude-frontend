import { UserTypes } from "../actions/user/user.types"

const initialState = { 
    loading: false,
    error: false,
    message: '',
    contracts: [],
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type){
        case UserTypes.GET_USER_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                message: ''
            }
        case UserTypes.GET_USER_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                contracts: action.payload
            }
        case UserTypes.GET_USER_ORDERS_FAILURE:
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