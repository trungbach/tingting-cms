import request from './request';

export default {
    getListIp: payload => {
        return request.get('api/v1/ip-address/get', payload);
    },
    deleteIp: payload => {
        return request.post('api/v1/ip-address/update', payload);
    },

    addIp: payload => {
        return request.post('api/v1/ip-address/create', payload);
    },
};
