import React, { useEffect } from "react";
import styles from "./styles.scss";
import { connect } from "dva";
import GetOTP from "./GetOTP";
import CheckOTP from "./CheckOTP";
import EnterNewPassword from "./EnterNewPassword";
import { withRouter, router } from "umi";

export const stepForgotPassword = {
  GET_OTP: 0,
  CHECK_OTP: 1,
  RESET_PASSWORD: 2,
  RESET_SUCCESS: 3,
};
function ForgotPassword({ dispatch, forgotPassStore, masterdataStore }) {
  const { step, newPassword, forgotAccount } = forgotPassStore;
  const { isLoginSuccess } = masterdataStore;

  useEffect(() => {
    if (isLoginSuccess) {
      router.push("/admin/overview");
    }
  }, [isLoginSuccess]);

  useEffect(() => {
    if (step === stepForgotPassword.RESET_SUCCESS) {
      const payload = {
        username: forgotAccount,
        passwordRequest: newPassword,
      };
      dispatch({ type: "MASTERDATA/login", payload: payload });
    }
  }, [step]);

  const renderStep = () => {
    if (step === stepForgotPassword.GET_OTP) {
      return <GetOTP />;
    } else if (step === stepForgotPassword.CHECK_OTP) {
      return <CheckOTP />;
    } else if (step === stepForgotPassword.RESET_PASSWORD) {
      return <EnterNewPassword />;
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <div className={styles.form}>{renderStep()}</div>
      </div>
      <div className={styles.loginImg}></div>
    </div>
  );
}

export default connect(({ MASTERDATA, FORGOT_PASS }) => ({
  masterdataStore: MASTERDATA,
  forgotPassStore: FORGOT_PASS,
}))(withRouter(ForgotPassword));
