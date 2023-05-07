import { mainInterceptor } from "../axiosInterceptor/mainInterceptor";

export const getUserContractsEndpoint = () => {
    return mainInterceptor.get(`/contracts`);
}

export const getUsersEndpoint = () => {
    return mainInterceptor.get(`/users`);
}