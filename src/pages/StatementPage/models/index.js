import statementService from "@/services/statement";
import { message } from "antd";
import { handleErrorModel } from "@/util/function";
export default {
  namespace: "STATEMENT",
  state: {
    loading: false,
    statements: [],
    totalRow: 0,
    repaymentResponse: {},
    transactions: [],
  },
  reducers: {
    getStatementsSuccess(state, action) {
      return {
        ...state,
        statements: action.payload,
        loading: false,
      };
    },

    getTransactionsSuccess(state, action) {
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    },

    companyRepaymentSuccess(state, action) {
      return {
        ...state,
        repaymentResponse: action.payload,
        loading: false,
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
    *getTransactions(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(
          statementService.getTransactions,
          action.payload
        );
        if (res.status === 200) {
          yield put({ type: "getTransactionsSuccess", payload: res.body.data });
        } else {
          message.error(res.body.message);
          yield put({ type: "error" });
        }
      } catch (error) {
        handleErrorModel(error);
        yield put({ type: "error" });
      }
    },

    *getStatements(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(
          statementService.getStatements,
          action.payload
        );
        if (res.status === 200) {
          yield put({ type: "getStatementsSuccess", payload: res.body.data });
        } else {
          message.error(res.body.message);
          yield put({ type: "error" });
        }
      } catch (error) {
        handleErrorModel(error);
        yield put({ type: "error" });
      }
    },

    *companyRepayment(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(
          statementService.companyRepayment,
          action.payload
        );
        if (res.status === 200) {
          yield put({ type: "companyRepaymentSuccess", payload: res.body });
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
