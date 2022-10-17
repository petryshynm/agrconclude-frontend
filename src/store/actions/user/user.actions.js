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
