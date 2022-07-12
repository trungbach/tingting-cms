import accountService from '@/services/account';
import { message } from 'antd';
import { handleErrorModel } from '@/util/function';
import { router } from 'umi';
export default {
    namespace: 'ACCOUNT',
    state: {
        loading: false,
        accounts: [],
        detailAccount: {},
        totalRow: 0,
        deleteResponse: {},
        activeResponse: {},
        contract: {},
        bankAccount: {},
    },
    reducers: {
        getAccountsSuccess(state, action) {
            return {
                ...state,
                accounts: action.payload.data,
                loading: false,
                totalRow: action.payload.totalRecord,
            };
        },

        getDetailAccountSuccess(state, action) {
            return {
                ...state,
                detailAccount: action.payload.data,
            };
        },

        resetCurrentAccountSuccess(state) {
            return {
                ...state,
                detailAccount: {},
            };
        },

        loading(state) {
            return {
                ...state,
                loading: true,
            };
        },

        success(state) {
            return {
                ...state,
                loading: false,
            };
        },

        error(state) {
            return {
                ...state,
                loading: false,
            };
        },

        deleteAccountSuccess(state, action) {
            return {
                ...state,
                loading: false,
                deleteResponse: action.payload,
            };
        },

        restoreAccountSuccess(state, action) {
            return {
                ...state,
                loading: false,
                deleteResponse: action.payload,
            };
        },

        activeUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                activeResponse: action.payload,
            };
        },

        getContractSuccess(state, action) {
            return {
                ...state,
                loading: false,
                contract: action.payload,
            };
        },

        getBankAccountSuccess(state, action) {
            return {
                ...state,
                loading: false,
                bankAccount: action.payload,
            };
        },
    },

    effects: {
        *getAccounts(action, { call, put }) {
            yield put({ type: 'loading' });
            try {
                const res = yield call(accountService.getAccounts, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'getAccountsSuccess', payload: res.body });
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },

        *getDetailAccount(action, { call, put }) {
            try {
                const res = yield call(accountService.getDetailAccount, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'getDetailAccountSuccess', payload: res.body });
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },
        *resetCurrentAccount(action, { call, put }) {
            yield put({ type: 'resetCurrentAccountSuccess' });
        },

        *deleteAccount(action, { call, put }) {
            yield put({ type: 'loading' });
            try {
                const res = yield call(accountService.deleteAccount, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'deleteAccountSuccess', payload: res.body });
                    message.success(res.body.message);
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },

        *createAccount(action, { call, put }) {
            yield put({ type: 'loading' });
            try {
                const res = yield call(accountService.createAccount, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'success', payload: res.body });
                    message.success(res.body.message);
                    router.push('/admin/account-manage');
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },

        *updateAccount(action, { call, put }) {
            yield put({ type: 'loading' });
            try {
                const res = yield call(accountService.updateAccount, action.payload.data);
                if (res.status === 200) {
                    yield put({ type: 'success', payload: res.body });
                    message.success(res.body.message);
                    //   router.push(`/admin/detail-account/${action.payload.userCode}`);
                    router.push('/admin/account-manage');
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },

        *resetCurrentEdit(action, { call, put }) {
            yield put({ type: 'resetCurrentEdit' });
        },

        *restoreAccount(action, { call, put }) {
            console.log('action', action);

            yield put({ type: 'loading' });
            try {
                const res = yield call(accountService.restoreAccount, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'restoreAccountSuccess', payload: res.body });
                    message.success(res.body.message);
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },

        *activeUser(action, { call, put }) {
            yield put({ type: 'loading' });
            try {
                const res = yield call(accountService.activeUser, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'activeUserSuccess', payload: res.body });
                    message.success(res.body.message);
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },

        *unactiveUser(action, { call, put }) {
            yield put({ type: 'loading' });
            try {
                const res = yield call(accountService.unactiveUser, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'activeUserSuccess', payload: res.body });
                    message.success(res.body.message);
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },
        *uploadContract(action, { call, put }) {
            yield put({ type: 'loading' });
            try {
                const res = yield call(accountService.uploadContract, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'uploadContractSuccess', payload: res.body });
                    message.success(res.body.message);
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },
        *getContract(action, { call, put }) {
            yield put({ type: 'loading' });
            try {
                const res = yield call(accountService.getContract, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'getContractSuccess', payload: res.body.data });
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },

        *getBankAccount(action, { call, put }) {
            yield put({ type: 'loading' });
            try {
                const res = yield call(accountService.getBankAccount, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'getBankAccountSuccess', payload: res.body.data });
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },
    },
};
