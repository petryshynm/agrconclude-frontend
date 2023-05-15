import { mainInterceptor } from "../axiosInterceptor/mainInterceptor";

export const getMyAgreementsEndpoint = () => {
    return mainInterceptor.get(`/contracts?isMine=true`);
}

export const getSignAgreementsEndpoint = () => {
    return mainInterceptor.get(`/contracts`);
}

export const getAgreementEndpoint = (id) => {
    return mainInterceptor.get(`/contracts/${id}`);
}

export const createAgreementEndpoint = (data) => {
    return mainInterceptor.post(`/contracts`, data)
}

export const changeAgreementStatusEndpoint = (id, data) => {
    return mainInterceptor.patch(`/contracts/${id}`, data)
}

export const getUsersEndpoint = () => {
    return mainInterceptor.get(`/users`);
}

export const editProfileEndpoint = () => {
    return mainInterceptor.patch('/profile');
}

export const getProfileEndpoint = () => {
    return mainInterceptor.get('/profile');
}
