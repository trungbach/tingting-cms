import transactionService from "@/services/transaction";
import { message } from "antd";
import { handleErrorModel } from "@/util/function";
export default {
  namespace: "TRANSACTION",
  state: {
    loading: false,
    transactions: [],
    totalRow: 0,
    updateResponse: {},
    detailTransaction: {},
  },
  reducers: {
    getTransactionsSuccess(state, action) {
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    },

    updateTransactionSuccess(state, action) {
      return {
        ...state,
        updateResponse: action.payload,
        loading: false,
      };
    },

    checkTransactionSuccess(state, action) {
      return {
        ...state,
        checkResponse: action.payload,
        loading: false,
      };
    },

    getDetailTransactionSuccess(state, action) {
      return {
        ...state,
        detailTransaction: action.payload,
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
          transactionService.getTransactions,
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

    *updateTransaction(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(
          transactionService.updateTransaction,
          action.payload
        );
        if (res.status === 200) {
          yield put({ type: "updateTransactionSuccess", payload: res.body });
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

    *checkTransaction(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(
          transactionService.checkTransaction,
          action.payload
        );
        if (res.status === 200) {
          yield put({ type: "checkTransactionSuccess", payload: res.body });
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

    *getDetailTransaction(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(
          transactionService.getDetailTransaction,
          action.payload
        );
        if (res.status === 200) {
          yield put({
            type: "getDetailTransactionSuccess",
            payload: res.body.data,
          });
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
