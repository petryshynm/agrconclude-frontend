import { UserTypes } from "./user.types"

export const getUserContractsRequest = () => ({
    type: UserTypes.GET_USER_CONTRACTS_REQUEST,
})

export const getUserContractsSuccess = (contracts) => ({
    type: UserTypes.GET_USER_CONTRACTS_SUCCESS,
    payload: contracts
})

export const getUserContractsFailure = (error) => ({
    type: UserTypes.GET_USER_CONTRACTS_FAILURE,
    payload: error
})

export const getUsersRequest = () => ({
    type: UserTypes.GET_USERS_REQUEST,
})

export const getUsersSuccess = (users) => ({
    type: UserTypes.GET_USERS_SUCCESS,
    payload: users
})

export const getUsersFailure = (error) => ({
    type: UserTypes.GET_USERS_FAILURE,
    payload: error
})
