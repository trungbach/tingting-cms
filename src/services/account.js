import request from "./request";

export default {
  getAccounts: (payload) => {
    return request.get("api/admin/v1/user/get-user", payload);
  },
  getDetailAccount: (payload) => {
    return request.get("api/admin/v1/user/get-detail", payload);
  },
  activeUser: (payload) => {
    return request.post("api/admin/v1/user/approve", payload);
  },
  unactiveUser: (payload) => {
    return request.post("api/admin/v1/user/un-approve", payload);
  },
  deleteAccount: (payload) => {
    return request.post("api/admin/v1/user/delete-user", payload);
  },
  createAccount: (payload) => {
    return request.post("api/admin/v1/auth/add-user", payload);
  },
  restoreAccount: (payload) => {
    return request.post("api/admin/v1/user/restore-user", payload);
  },
  updateAccount: (payload) => {
    return request.post("api/admin/v1/user/edit-user", payload);
  },

  uploadContract: (payload) => {
    return request.post("api/admin/v1/user/upload-contract", payload);
  },
  getContract: (payload) => {
    return request.get("api/admin/v1/user/get-contract", payload);
  },

  getBankAccount: (payload) => {
    return request.get("api/admin/v1/bank/get-bank-account", payload);
  },
};
