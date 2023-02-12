import { AuthTypes } from "./auth.types";

export const loginUserRequest = (body) => ({
    type: AuthTypes.LOGIN_REQUEST,
    payload: body,
});
export const loginUserSuccess = (token) => ({
    type: AuthTypes.LOGIN_SUCCESS,
    payload: token
});
export const loginUserFailure = (error) => ({
    type: AuthTypes.LOGIN_FAILURE,
    payload: error,
});

export const logoutUserRequest = () => ({
    type: AuthTypes.LOGOUT_REQUEST,
});
export const logoutUserSuccess = () => ({
    type: AuthTypes.LOGOUT_SUCCESS,
});
export const logoutUserFailure = (error) => ({
    type: AuthTypes.LOGOUT_FAILURE,
    payload: error,
});