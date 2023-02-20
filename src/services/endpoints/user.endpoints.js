import { mainInterceptor } from "../axiosInterceptor/mainInterceptor";

export const getUserContractsEndpoint = () => {
    return mainInterceptor.get(`/user/contracts`)
}