import { createAction } from "..";
import { AuthTypes } from "./auth.types";

export const loginUserActions = createAction(AuthTypes.LOGIN); 

export const logoutUserActions = createAction(AuthTypes.LOGOUT); 
