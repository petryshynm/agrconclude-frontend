import { driveInterceptor } from "../axiosInterceptor/driveInterceptor";

const apiKey = process.env.REACT_APP_API_KEY || "";

export const getDocumentsEndpoint = ({pageSize = 10}) => {
    return driveInterceptor.get(`/files?pageSize=${pageSize}&q=mimeType='application/vnd.google-apps.document' and name contains 'AGC'&fields=files(id, name)&key=${apiKey}`);
};