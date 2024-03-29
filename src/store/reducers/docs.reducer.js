import { DocsTypes } from "../actions/docs/docs.types"

const initialState = { 
    loading: false,
    error: false,
    message: '',
    documents: [],
    signFields: [],
    signature: null,
    signatureURL: null,
}

export const DocsReducer = (state = initialState, action) => {
    switch (action.type){
        case `${DocsTypes.GET_SIGNATURE}_SUCCESS`:
            return {
                ...state,
                loading: false,
                error: false,
                signature: action.payload.signature,
                signatureURL: action.payload.signatureURL,
            }
        case `${DocsTypes.GET_DOCUMENT_FIELDS}_SUCCESS`:
            return {
                ...state,
                loading: false,
                error: false,
                signFields: action.payload,
            }
        case `${DocsTypes.GET_DOCUMENTS}_SUCCESS`:
            return {
                ...state,
                loading: false,
                error: false,
                documents: action.payload
            }
        case `${DocsTypes.CREATE_SIGNATURE}_SUCCESS`:
        case `${DocsTypes.SIGN_DOCUMENT_FIELDS}_SUCCESS`:
            return {
                ...state,
                loading: false,
                error: false,
            }
        case `${DocsTypes.CREATE_SIGNATURE}_REQUEST`:
        case `${DocsTypes.GET_DOCUMENT_FIELDS}_REQUEST`:
        case `${DocsTypes.GET_SIGNATURE}_REQUEST`:
        case `${DocsTypes.GET_DOCUMENTS}_REQUEST`:
        case `${DocsTypes.SIGN_DOCUMENT_FIELDS}_REQUEST`:
            return {
                ...state,
                loading: true,
                error: false,
                message: ''
            }
        case `${DocsTypes.CREATE_SIGNATURE}_FAILURE`:
        case `${DocsTypes.GET_DOCUMENT_FIELDS}_FAILURE`:
        case `${DocsTypes.GET_SIGNATURE}_FAILURE`:
        case `${DocsTypes.GET_DOCUMENTS}_FAILURE`:
        case `${DocsTypes.SIGN_DOCUMENT_FIELDS}_FAILURE`:
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