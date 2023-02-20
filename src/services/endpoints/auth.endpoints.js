import { mainInterceptor } from "../axiosInterceptor/mainInterceptor";

export const loginUserEndpoint = (body) => {
    return mainInterceptor.post('/auth/login', body);
};