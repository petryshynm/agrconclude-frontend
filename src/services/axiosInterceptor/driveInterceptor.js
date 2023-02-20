import axios from 'axios';
import { gapi } from 'gapi-script';
import { Paths } from '../routes/paths';

export const driveInterceptor = axios.create({
    baseURL: 'https://www.googleapis.com/drive/v3',
});
const handleRequest = (request) => {
    const accessToken = gapi.auth.getToken().access_token;
    request.headers['Authorization'] = `Bearer ${accessToken}`
    // request.headers['mode'] = 'no-cors'
    // request.headers['Access-Control-Allow-Origin'] = '*'
    return request;
};
driveInterceptor.interceptors.request.use(req => handleRequest(req));
driveInterceptor.interceptors.response.use(
    res => res,
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            window.location.href = Paths.HOME;
        }
        return Promise.reject(error.response.data);
    },
);
