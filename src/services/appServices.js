import BaseService from './baseService';
import API from '../config/rest';

const getAllData = () => {
    return BaseService.get(API.DATA);
}

const getDataId = (id) => {
    return BaseService.get(API.FILEDATA(id));
}

const lectureList = () => {
    return BaseService.get(API.LECTURE);
}

const appServices = {
    getAllData,
    getDataId,
    lectureList,
}

export default appServices;