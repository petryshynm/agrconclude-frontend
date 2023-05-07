import { mainInterceptor } from "../axiosInterceptor/mainInterceptor";

export const getUserContractsEndpoint = () => {
    return mainInterceptor.get(`/contracts`);
}

export const getUsersEndpoint = () => {
    return mainInterceptor.get(`/users`);
}

export const createAgreementEndpoint = (data) => {
    return mainInterceptor.post(`http://localhost:5000/agreements`, data)
}

export const changeAgreementStatusEndpoint = (id, data) => {
    return mainInterceptor.patch(`http://localhost:5000/agreements/${id}`, data)
}