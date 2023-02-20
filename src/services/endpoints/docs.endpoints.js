import { docsInterceptor } from "../axiosInterceptor/docsInterceptor";

export const createDocumentEndpoint = () => {
    return docsInterceptor.post('/documents');
};