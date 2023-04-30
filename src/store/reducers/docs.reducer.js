import { DocsTypes } from "../actions/docs/docs.types"

const initialState = { 
    loading: false,
    error: false,
    message: '',
    documents: [],
    signFields: [],
    signature: null,
}

export const DocsReducer = (state = initialState, action) => {
    switch (action.type){
        case `${DocsTypes.GET_SIGNATURE}_SUCCESS`:
            return {
                ...state,
                loading: false,
                error: false,
                signature: action.payload,
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
        case `${DocsTypes.COPY_DOC}_SUCCESS`:
        case `${DocsTypes.CREATE_DOC}_SUCCESS`:
            return {
                ...state,
                loading: false,
                error: false,
            }
        case `${DocsTypes.CREATE_SIGNATURE}_REQUEST`:
        case `${DocsTypes.GET_DOCUMENT_FIELDS}_REQUEST`:
        case `${DocsTypes.GET_SIGNATURE}_REQUEST`:
        case `${DocsTypes.GET_DOCUMENTS}_REQUEST`:
        case `${DocsTypes.COPY_DOC}_REQUEST`:
        case `${DocsTypes.CREATE_DOC}_REQUEST`:
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
        case `${DocsTypes.COPY_DOC}_FAILURE`:
        case `${DocsTypes.CREATE_DOC}_FAILURE`:
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