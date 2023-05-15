import { createAction } from "..";
import { AuthTypes } from "./auth.types";

export const loginUserActions = createAction(AuthTypes.LOGIN); 

export const logoutUserActions = createAction(AuthTypes.LOGOUT); 

export const editProfileActions = createAction(AuthTypes.EDIT_PROFILE);

export const getProfileActions = createAction(AuthTypes.GET_PROFILE);
