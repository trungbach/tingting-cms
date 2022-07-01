import request from "./request";

export default {
  login: (payload) => {
    return request.post("api/admin/v1/auth/signin", payload);
  },
  changePassword: (payload) => {
    return request.post("api/v1/auth/change-password", payload);
  },
  changePasswordForgot: (payload) => {
    return request.post("api/v1/auth/change-pass-forgot", payload);
  },
  sendOtp: (payload) => {
    return request.post("api/v1/auth/send-otp", payload);
  },
  checkOtp: (payload) => {
    return request.post("api/v1/auth/check-otp", payload);
  },
};