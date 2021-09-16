import BaseService from './baseService';
import API from '../config/rest';

const login = (nim, password) => {
  return BaseService.post(API.LOGIN, { nim, password });
};

export default { login };
