import { DocsTypes } from "../actions/docs/docs.types"

const initialState = { 
    loading: false,
    error: false,
    message: '',
    documents: [],
}

export const DocsReducer = (state = initialState, action) => {
    switch (action.type){
        case DocsTypes.GET_DOCUMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                documents: action.payload
            }
        case DocsTypes.COPY_DOC_SUCCESS:
        case DocsTypes.CREATE_DOC_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
            }
        case DocsTypes.GET_DOCUMENTS_REQUEST:
        case DocsTypes.COPY_DOC_REQUEST:
        case DocsTypes.CREATE_DOC_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                message: ''
            }
        case DocsTypes.GET_DOCUMENTS_FAILURE:
        case DocsTypes.COPY_DOC_FAILURE:
        case DocsTypes.CREATE_DOC_FAILURE:
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