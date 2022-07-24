import request from './request';

export default {
    getDevices: payload => {
        return request.get('api/v1/mobile-device/get', payload);
    },

    getPaymentType: payload => {
        return request.get('api/v1/payment-type/get', payload);
    },

    updateStatus: payload => {
        return request.post('api/v1/mobile-device/update', payload);
    },

    createCard: payload => {
        return request.post('api/v1/mobile-device/create', payload);
    },

    deleteDevice: payload => {
        return request.post('api/v1/mobile-device/delete', payload);
    },
};
