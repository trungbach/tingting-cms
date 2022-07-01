import borrowService from "@/services/borrow";
import { message } from "antd";
import { handleErrorModel } from "@/util/function";
export default {
  namespace: "BORROW",
  state: {
    loading: false,
    totalRow: 0,
    borrowData: [],
    repayResponse: {},
  },
  reducers: {
    getUserBorrowSuccess(state, action) {
      return {
        ...state,
        borrowData: action.payload,
        totalRow: action.payload.length,
        loading: false,
      };
    },

    staffRepaymentSuccess(state, action) {
      return {
        ...state,
        loading: false,
        repayResponse: action.payload,
      };
    },

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
  },

  effects: {
    *getUserBorrow(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(borrowService.getUserBorrow, action.payload);
        if (res.status === 200) {
          yield put({ type: "getUserBorrowSuccess", payload: res.body.data });
        } else {
          message.error(res.body.message);
          yield put({ type: "error" });
        }
      } catch (error) {
        handleErrorModel(error);
        yield put({ type: "error" });
      }
    },

    *repayment(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(borrowService.repayment, action.payload);
        if (res.status === 200) {
          yield put({ type: "repaymentSuccess", payload: res.body });
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
    *staffRepayment(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(borrowService.staffRepayment, action.payload);
        if (res.status === 200) {
          yield put({ type: "staffRepaymentSuccess", payload: res.body });
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
