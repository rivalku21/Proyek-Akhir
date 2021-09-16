import axios from 'axios';
import { getCookie } from '../utils/cookie';

function getTokenAuth() {
    if (getCookie('token')) {
      return JSON.parse(getCookie('token'));
    }
    return '';
}

const createAxiosInterceptor = (url) => {
    const axiosCreate = axios.create({
        baseURL: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getTokenAuth()}`,
        },
    });
    axiosCreate.interceptors.response.use(
        (response) => {
            return response.data;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosCreate;
};

const BaseService = createAxiosInterceptor(process.env.REACT_APP_API);

export default BaseService;