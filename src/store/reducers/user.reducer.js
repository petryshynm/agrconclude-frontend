import { UserTypes } from "../actions/user/user.types";

const initialState = {
  loading: false,
  error: false,
  message: "",
  contracts: [],
  users: [],
  signAgreements: [],
  myAgreements: [],
  agreement: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${UserTypes.GET_USERS}_REQUEST`:
    case `${UserTypes.GET_USER_CONTRACTS}_REQUEST`:
    case `${UserTypes.GET_MY_AGREEMENTS}_REQUEST`:
    case `${UserTypes.GET_SIGN_AGREEMENTS}_REQUEST`:
    case `${UserTypes.GET_AGREEMENT}_REQUEST`:
      return {
        ...state,
        loading: true,
        error: false,
        message: "",
      };
    case `${UserTypes.GET_USERS}_FAILURE`:
    case `${UserTypes.GET_USER_CONTRACTS}_FAILURE`:
    case `${UserTypes.GET_MY_AGREEMENTS}_FAILURE`:
    case `${UserTypes.GET_SIGN_AGREEMENTS}_FAILURE`:
    case `${UserTypes.GET_AGREEMENT}_FAILURE`:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };
    case `${UserTypes.GET_USER_CONTRACTS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        error: false,
        contracts: action.payload,
      };
    case `${UserTypes.GET_USERS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        error: false,
        users: action.payload,
      };
    case `${UserTypes.GET_MY_AGREEMENTS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        error: false,
        myAgreements: action.payload,
      };
    case `${UserTypes.GET_SIGN_AGREEMENTS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        error: false,
        signAgreements: action.payload,
      };
    case `${UserTypes.GET_AGREEMENT}_SUCCESS`:
      return {
        ...state,
        loading: false,
        error: false,
        agreement: action.payload,
      };
    default:
      return state;
  }
};
