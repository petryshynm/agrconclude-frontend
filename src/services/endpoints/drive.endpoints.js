import { driveInterceptor } from "../axiosInterceptor/driveInterceptor";
import { dataURIToBlob } from "../utils";

const apiKey = process.env.REACT_APP_API_KEY || "";

export const getDocumentsEndpoint = (pageSize = 10) => {
  return driveInterceptor.get(
    `/files?pageSize=${pageSize}&q=mimeType='application/vnd.google-apps.document' and name contains 'AGC'&fields=files(id, name)&trashed=false&key=${apiKey}`
  );
};

export const getSignatureEndpoint = () => {
  return driveInterceptor.get(`/files?q=name='Signature.png' and trashed=false`);
};

export const copyDocumentEndpoint = ({ fileId, fileName }) => {
  return driveInterceptor.post(`files/${fileId}/copy`, {
    name: fileName,
  });
};

export const getFileEndpoint = (fileId) => {
  return driveInterceptor.get(`/files/${fileId}?alt=media&key=${apiKey}`);
}

export const getFileEndpointV2 = (fileId, url = 'alt=media') => {   // TODO: make it axios
  const headers = { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`} };
  return fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?&key=${apiKey}&${url}`, headers);
}

export const giveFilePermissionEndpoint = (fileId, body) => {
  return driveInterceptor.post(`/files/${fileId}/permissions`, body)
}

export const createSignatureEndpoint = (imageDataUrl) => {
  const blob = dataURIToBlob(imageDataUrl);
  const metadata = {
    name: "Signature.png", 
    mimeType: "image/png", 
  };
  const formData = new FormData();
  formData.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  formData.append("file", blob, "Signature.png");

  return driveInterceptor.post(`/files?uploadType=multipart`, formData, {
    baseURL: "https://www.googleapis.com/upload/drive/v3",
    headers: {
      "Content-Type": `multipart/related; boundary=${formData._boundary}`,
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  });
};
