import request from './request';

export default {
    getAccounts: payload => {
        return request.get('api/v1/user/get-user', payload);
    },
    getDetailAccount: payload => {
        return request.get('api/v1/user/detail', payload);
    },

    deleteAccount: payload => {
        return request.post('api/admin/v1/user/delete-user', payload);
    },
    createAccount: payload => {
        return request.post('api/admin/v1/user/add-user', payload);
    },
    restoreAccount: payload => {
        return request.post('api/admin/v1/user/restore-user', payload);
    },
    updateAccount: payload => {
        return request.post('api/admin/v1/user/edit-user', payload);
    },

    configMoney: payload => {
        return request.post('api/v1/money-config/update', payload);
    },

    getSercret: payload => {
        return request.post(`api/v1/secret-key/get?userId=${payload.userId}`);
    },

    createSecret: payload => {
        return request.post('api/v1/secret-key/create', payload);
    },
    configUSDT: payload => {
        return request.post('api/v1/payment-type/update', payload);
    },
};
