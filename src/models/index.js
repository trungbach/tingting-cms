import authService from '@/services/auth';
import masterService from '@/services/masterData';
import { message } from 'antd';
import { handleRemoveLocal, handleErrorModel } from '@/util/function';
import { router } from 'umi';
import _ from 'lodash';
import { TOKEN_KEY, ADMIN_KEY } from '@/config/constant';
import { formatMessage } from 'umi-plugin-react/locale';

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
            console.log('action', action);
            const { accessToken } = action.payload.body;
            localStorage.setItem(TOKEN_KEY, accessToken);
            localStorage.setItem(ADMIN_KEY, JSON.stringify(action.payload.body));
            message.success(formatMessage({ id: 'LOGIN_SUCCESS' }));
            return {
                ...state,
                loginLoading: false,
                isLogin: true,
            };
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
            }
        },

        updateCompanySuccess(state, action) {
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
            handleRemoveLocal();
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
            try {
                const res = yield call(authService.changePassword, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'changePasswordSuccess' });
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

        *login(action, { call, put }) {
            yield put({ type: 'startLogin' });
            try {
                const res = yield call(authService.login, action.payload);
                if (res.status === 200) {
                    yield put({ type: 'loginSuccess', payload: res.body });
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
