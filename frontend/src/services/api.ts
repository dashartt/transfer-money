import axios from 'axios';

import { AuthRequestDTO, TransferRequestDTO } from '../types/RequestData';

const request = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const requestAuth = async (reqData: AuthRequestDTO, typeAuth: string) => {
  return request
    .post(`/auth?option=${typeAuth}`, { ...reqData })
    .then(({ data }) => data)
    .catch((error) => error.response.data);
};

export const requestTransfer = async (reqData: TransferRequestDTO) => {
  return request
    .post('/transactions/transfer', { reqData })
    .then(({ data }) => data)
    .catch((error) => error.response.data);
};
