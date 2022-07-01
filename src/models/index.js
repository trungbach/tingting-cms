import authService from '@/services/auth';
import masterService from '@/services/masterData';
import { message } from 'antd';
import {
    handleRemoveSession,
    handleErrorModel,
    statusLogin,
    checkPasswordExpired,
} from '@/util/function';
import { router } from 'umi';
import _ from 'lodash';
import { COMPANY_ID, ROLE_ADMIN_COMPANY } from '@/config/constant';
export default {
    namespace: 'MASTERDATA',
    state: {
        loading: false,
        loginLoading: false,
        companies: [],
        companyId: undefined,
        companyCode: undefined,
        isLogin: false,
        isFirstLogin: false,
        initPass: undefined,
        changePasswordSuccess: false,
        myProfile: {},
        hideSelectCompanies: false,
        updateProfileResponse: {},
    },

    reducers: {
        loading(state) {
            return {
                ...state,
                loading: true,
            };
        },
        error(state) {
            return {
                ...state,
                loading: false,
            };
        },

        changePasswordSuccess(state) {
            return {
                ...state,
                loading: false,
                changePasswordSuccess: true,
                isFirstLogin: false,
            };
        },

        startLogin(state) {
            return {
                ...state,
                loginLoading: true,
            };
        },

        loginSuccess(state, action) {
            const { accessToken, role, companyId } = action.payload.data;
            const statusAuth = checkPasswordExpired(action.payload.data.passwordExpiredAt);
            if (statusAuth === statusLogin.LOGIN_SUCCESS) {
                sessionStorage.setItem('token', accessToken);
                sessionStorage.setItem('Admin', JSON.stringify(action.payload.data));
                message.success('Đăng nhập thành công!');
                if (role === ROLE_ADMIN_COMPANY) {
                    const oldCompanyId = sessionStorage.getItem(COMPANY_ID);
                    if (companyId !== Number(oldCompanyId)) {
                        sessionStorage.setItem(COMPANY_ID, companyId);
                    }
                    return {
                        ...state,
                        loginLoading: false,
                        companyId: companyId,
                        isLogin: true,
                    };
                } else {
                    return {
                        ...state,
                        loginLoading: false,
                        isLogin: true,
                    };
                }
            } else {
                sessionStorage.setItem('token', accessToken);
                return {
                    ...state,
                    loginLoading: false,
                    isFirstLogin: statusAuth === statusLogin.FIRST_LOGIN,
                    initPass: action.payload.initPass,
                    isLogin: false,
                };
            }
        },

        loginFail(state, action) {
            return {
                ...state,
                loginLoading: false,
            };
        },

        getListCompaniesSuccess(state, action) {
            if (state.companyId && state.companyCode) {
                return {
                    ...state,
                    companies: action.payload,
                };
            } else {
                var oldCompanyId = sessionStorage.getItem(COMPANY_ID);
                if (oldCompanyId) {
                    var index = _.findIndex(action.payload, function(o) {
                        return o.id == Number(oldCompanyId);
                    });
                    if (index >= 0) {
                        let companyId = Number(oldCompanyId);
                        const { code } = action.payload.find(company => company.id === companyId);
                        return {
                            ...state,
                            companies: action.payload,
                            companyId: companyId,
                            companyCode: code,
                        };
                    } else {
                        sessionStorage.setItem(COMPANY_ID, action.payload[0].id);
                    }
                } else {
                    sessionStorage.setItem(COMPANY_ID, action.payload[0].id);
                }
                return {
                    ...state,
                    companies: action.payload,
                    companyId: action.payload[0].id,
                    companyCode: action.payload[0].code,
                };
            }
        },

        updateCompanySuccess(state, action) {
            sessionStorage.setItem(COMPANY_ID, action.payload.id);
            return {
                ...state,
                companyId: action.payload.id,
            };
        },

        hideSelectCompaniesSuccess(state, action) {
            return {
                ...state,
                hideSelectCompanies: action.payload,
            };
        },

        logoutSuccess(state, action) {
            handleRemoveSession();

            return {
                ...state,
                isLogin: false,
            };
        },

        getMyProfileSuccess(state, action) {
            return {
                ...state,
                myProfile: action.payload,
                loading: false,
            };
        },

        updateProfileSuccess(state, action) {
            return {
                ...state,
                updateProfileResponse: action.payload,
                loading: false,
            };
        },
    },

    effects: {
        *changePassword(action, { call, put }) {
            yield put({ type: 'loading' });
            try {
                const res = yield call(authService.changePassword, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'changePasswordSuccess' });
                    message.success(res.body.message);
                    router.push('/login');
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },

        *login(action, { call, put }) {
            yield put({ type: 'startLogin' });
            try {
                const res = yield call(authService.login, action.payload);
                if (res.status === 200) {
                    let payload = {
                        data: res.body.data,
                        initPass: action.payload.passwordRequest,
                    };
                    yield put({ type: 'loginSuccess', payload: payload });
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'loginFail' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'loginFail' });
            }
        },

        *logout(action, { call, put }) {
            yield put({ type: 'logoutSuccess' });
            router.push('/login');
        },

        *getListCompanies(action, { call, put }) {
            try {
                const res = yield call(masterService.getAllCompany, action.payload);
                yield put({ type: 'getListCompaniesSuccess', payload: res.body.data });
            } catch (error) {
                handleErrorModel(error);
            }
        },

        *updateCompany(action, { call, put }) {
            yield put({ type: 'updateCompanySuccess', payload: action.payload });
        },

        *hideSelectCompanies(action, { call, put }) {
            yield put({
                type: 'hideSelectCompaniesSuccess',
                payload: action.payload,
            });
        },

        *getMyProfile(action, { call, put }) {
            yield put({ type: 'loading' });
            try {
                const res = yield call(masterService.getMyProfile, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'getMyProfileSuccess', payload: res.body.data });
                } else {
                    message.error(res.body.message);
                    yield put({ type: 'error' });
                }
            } catch (error) {
                handleErrorModel(error);
                yield put({ type: 'error' });
            }
        },
        *updateProfile(action, { call, put }) {
            yield put({ type: 'loading' });
            try {
                const res = yield call(masterService.updateProfile, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'updateProfileSuccess', payload: res.body });
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
    },
};
