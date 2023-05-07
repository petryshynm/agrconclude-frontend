import { UserTypes } from "../actions/user/user.types";

const initialState = {
  loading: false,
  error: false,
  message: "",
  users: [],
  signAgreements: [],
  myAgreements: [],
  agreement: null,
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${UserTypes.GET_USERS}_REQUEST`:
    case `${UserTypes.GET_MY_AGREEMENTS}_REQUEST`:
    case `${UserTypes.GET_SIGN_AGREEMENTS}_REQUEST`:
    case `${UserTypes.GET_AGREEMENT}_REQUEST`:
    case `${UserTypes.CREATE_AGREEMENT}_REQUEST`:
    case `${UserTypes.CHANGE_STATUS}_REQUEST`:
      return {
        ...state,
        loading: true,
        error: false,
        message: "",
      };
    case `${UserTypes.GET_USERS}_FAILURE`:
    case `${UserTypes.GET_MY_AGREEMENTS}_FAILURE`:
    case `${UserTypes.GET_SIGN_AGREEMENTS}_FAILURE`:
    case `${UserTypes.GET_AGREEMENT}_FAILURE`:
    case `${UserTypes.CREATE_AGREEMENT}_FAILURE`:
    case `${UserTypes.CHANGE_STATUS}_FAILURE`:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };
    case `${UserTypes.CREATE_AGREEMENT}_SUCCESS`:
    case `${UserTypes.CHANGE_STATUS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        error: false,
        message: "",
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
