import axios from 'axios';

type AuthData = {
  username: string | undefined;
  password: string | undefined;
};

const request = axios.create({
  baseURL: 'http://localhost:3001/',
});

export const requestAuth = async (reqData: AuthData, typeAuth: string) => {
  return request
    .post(`/auth?option=${typeAuth}`, { ...reqData })
    .then(({ data }) => data)
    .catch((error) => error.response.data);
};
