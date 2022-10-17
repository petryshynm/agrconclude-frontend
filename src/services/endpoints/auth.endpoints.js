import { axiosInstance } from "../axiosInterceptor/interceptor";

export const loginUserEndpoint = (body) => {
    return axiosInstance.post('/auth/login', body);
};

export const logoutUserEndpoint = () => {
    return axiosInstance.post('/auth/logout');
};