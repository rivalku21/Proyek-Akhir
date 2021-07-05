import BaseService from "./baseService";
import API from '../config/rest';

const uploads = (saveData) => {
    return BaseService.post(API.SAVE, saveData);
};

export default uploads ;