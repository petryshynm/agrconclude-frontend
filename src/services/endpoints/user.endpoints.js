import { axiosInstance } from "../axiosInterceptor/interceptor";

export const getUserContractsEndpoint = () => {
    return axiosInstance.get(`/user/contracts`)
}