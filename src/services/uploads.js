import BaseService from "./baseService";
import API from '../config/rest';

const uploads = (saveData) => {
    return BaseService.post(API.SAVE, saveData);
};

const register = (saveData) => {
    return BaseService.post(API.REGISTER, saveData);
}

export default {uploads, register};