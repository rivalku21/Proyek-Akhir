import axios from 'axios';

const createAxiosInterceptor = (url) => {
    const axiosCreate = axios.create({
        baseURL: url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
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