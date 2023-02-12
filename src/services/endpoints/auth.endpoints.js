import { axiosInstance } from "../axiosInterceptor/interceptor";

export const loginUserEndpoint = (body) => {
    return axiosInstance.post('/auth/login', body);
};