import authService from "@/services/auth";
import { message } from "antd";
import { handleErrorModel } from "@/util/function";
import { router } from "umi";
import { stepForgotPassword } from "@/pages/ForgotPassword";

export default {
  namespace: "FORGOT_PASS",
  state: {
    loading: false,
    step: stepForgotPassword.GET_OTP,
    forgotAccount: undefined,
    newPassword: undefined,
    code: undefined,
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

    success(state) {
      return {
        ...state,
        loading: false,
      };
    },

    sendOtpSuccess(state, action) {
      return {
        ...state,
        loading: false,
        step: stepForgotPassword.CHECK_OTP,
        forgotAccount: action.payload.account,
      };
    },
    checkOtpSuccess(state, action) {
      return {
        ...state,
        loading: false,
        step: stepForgotPassword.RESET_PASSWORD,
        code: action.payload.code,
      };
    },
    resetPasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        newPassword: action.payload.newPassword,
        step: stepForgotPassword.RESET_SUCCESS,
      };
    },

    backStep(state, action) {
      return {
        ...state,
        step: state.step - 1,
      };
    },
  },

  effects: {
    *sendOtp(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(authService.sendOtp, action.payload);
        if (res.status === 200) {
          yield put({
            type: "sendOtpSuccess",
            payload: { account: action.payload.account },
          });
          message.success(res.body.message);
          // router.push(`/forgot-password?acc=${action.payload.account}`);
        } else {
          message.error(res.body.message);
          yield put({ type: "error" });
        }
      } catch (error) {
        handleErrorModel(error);
        yield put({ type: "error" });
      }
    },

    *checkOtp(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(authService.checkOtp, action.payload);
        if (res.status === 200) {
          yield put({
            type: "checkOtpSuccess",
            payload: { code: action.payload.code },
          });
          message.success(res.body.message);
          // router.push(
          //   `/forgot-password?acc=${action.payload.account}&code=${action.payload.code}`
          // );
        } else {
          message.error(res.body.message);
          yield put({ type: "error" });
        }
      } catch (error) {
        yield put({ type: "error" });
        handleErrorModel(error);
      }
    },

    *changePasswordForgot(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(
          authService.changePasswordForgot,
          action.payload
        );
        if (res.status === 200) {
          yield put({
            type: "resetPasswordSuccess",
            payload: { newPassword: action.payload.password },
          });
          message.success(res.body.message);
        } else {
          message.error(res.body.message);
          yield put({ type: "error" });
        }
      } catch (error) {
        handleErrorModel(error);
        yield put({ type: "error" });
      }
    },
  },
};
