import { docsInterceptor } from "../axiosInterceptor/docsInterceptor";

export const createDocumentEndpoint = () => {
    return docsInterceptor.post('/documents');
};

export const getDocumentFieldsEndpoint = (documentId) => {
    return docsInterceptor.get(`/documents/${documentId}`);
}