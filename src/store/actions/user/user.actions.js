import { createAction } from "../index";
import { UserTypes } from "./user.types"

export const getUserContractsActions = createAction(UserTypes.GET_USER_CONTRACTS);

export const getUsersActions = createAction(UserTypes.GET_USERS);

export const getMyAgreementsActions = createAction(UserTypes.GET_MY_AGREEMENTS);

export const getSignAgreementsActions = createAction(UserTypes.GET_SIGN_AGREEMENTS);

export const getAgreementActions = createAction(UserTypes.GET_AGREEMENT);
