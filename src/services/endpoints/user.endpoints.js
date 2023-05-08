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

const formatParams = (data) => {
    const toCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    
    const res = Object.entries(data).reduce((prev, [key, value]) => {
        return prev + `${toCapitalize(key)}=${value}&`
    }, '');
    console.log(res)
    return res;
}

export const createAgreementEndpoint = (data) => {
    const formattedData = formatParams(data) //TODO
    return mainInterceptor.post(`/contracts?${formattedData}`)
    // return mainInterceptor.post(`/contracts`, data)
}

export const changeAgreementStatusEndpoint = (data) => {
    const formattedData = formatParams(data) //TODO
    return mainInterceptor.patch(`/contracts?${formattedData}`)
    // return mainInterceptor.patch(`/contracts/${id}`, data)
}

export const getUsersEndpoint = () => {
    return mainInterceptor.get(`/users`);
}
