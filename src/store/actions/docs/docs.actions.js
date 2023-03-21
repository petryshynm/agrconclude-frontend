import { DocsTypes } from "./docs.types";

export const createDocumentRequest = () => ({
    type: DocsTypes.CREATE_DOC_REQUEST,
});
export const createDocumentSuccess = (documentId) => ({
    type: DocsTypes.CREATE_DOC_SUCCESS,
    payload: documentId
});
export const createDocumentFailure = (error) => ({
    type: DocsTypes.CREATE_DOC_FAILURE,
    payload: error,
});

export const getDocumentsRequest = (config) => ({
    type: DocsTypes.GET_DOCUMENTS_REQUEST,
    payload: config
});
export const getDocumentsSuccess = (documents) => ({
    type: DocsTypes.GET_DOCUMENTS_SUCCESS,
    payload: documents
});
export const getDocumentsFailure = (error) => ({
    type: DocsTypes.GET_DOCUMENTS_FAILURE,
    payload: error,
});

export const copyDocumentRequest = (fileData) => ({
    type: DocsTypes.COPY_DOC_REQUEST,
    payload: fileData,
})

export const copyDocumentFailure = (error) => ({
    type: DocsTypes.COPY_DOC_FAILURE,
    payload: error,
})

export const copyDocumentSuccess = () => ({
    type: DocsTypes.COPY_DOC_SUCCESS
})