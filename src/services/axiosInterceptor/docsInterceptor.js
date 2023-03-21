import axios from 'axios';
import { Paths } from '../routes/paths';

export const docsInterceptor = axios.create({
    baseURL: 'https://docs.googleapis.com/v1/',
});

const handleRequest = async (request) => {
    const accessToken = localStorage.getItem('accessToken');
    request.headers['Authorization'] = `Bearer ${accessToken}`
    // request.headers['mode'] = 'no-cors'
    return request;
};
docsInterceptor.interceptors.request.use(req => handleRequest(req));
docsInterceptor.interceptors.response.use(
    res => res,
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('token');
            window.location.href = Paths.HOME;
        }
        return Promise.reject(error.response.data);
    },
);
