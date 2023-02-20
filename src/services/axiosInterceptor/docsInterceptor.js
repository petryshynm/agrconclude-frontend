import axios from 'axios';
import { gapi } from 'gapi-script';
import { Paths } from '../routes/paths';

export const docsInterceptor = axios.create({
    baseURL: 'https://docs.googleapis.com/v1/',
});
const handleRequest = (request) => {
    const accessToken = gapi.auth.getToken().access_token;
    request.headers['Authorization'] = `Bearer ${accessToken}`
    // request.headers['mode'] = 'no-cors'
    // request.headers['Access-Control-Allow-Origin'] = '*'
    return request;
};
docsInterceptor.interceptors.request.use(req => handleRequest(req));
docsInterceptor.interceptors.response.use(
    res => res,
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            window.location.href = Paths.HOME;
        }
        return Promise.reject(error.response.data);
    },
);
