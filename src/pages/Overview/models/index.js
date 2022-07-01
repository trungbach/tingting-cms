import { message } from "antd";
import { handleErrorModel } from "@/util/function";
import overviewService from "@/services/overview";
export default {
  namespace: "OVERVIEW",
  state: {
    loading: false,
    dashboardData: {},
    transactionResponse: [],
  },
  reducers: {
    loading(state, action) {
      return {
        ...state,
        loading: true,
      };
    },

    error(state, action) {
      return {
        ...state,
        loading: false,
      };
    },

    getDashboardSuccess(state, action) {
      return {
        ...state,
        loading: false,
        dashboardData: action.payload,
      };
    },
    getTransactionChartSuccess(state, action) {
      return {
        ...state,
        loading: false,
        transactionResponse: action.payload,
      };
    },
  },

  effects: {
    *getDashboard(action, { call, put }) {
      yield put({ type: "loading" });
      try {
        const res = yield call(overviewService.getDashboard, action.payload);
        if (res.status === 200) {
          yield put({
            type: "getDashboardSuccess",
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
    *getTransactionChart(action, { call, put }) {
      try {
        const res = yield call(
          overviewService.getTransactionChart,
          action.payload
        );
        if (res.status === 200) {
          yield put({
            type: "getTransactionChartSuccess",
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
