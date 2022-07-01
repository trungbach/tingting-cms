import React, { useMemo } from "react";
import styles from "./styles.scss";
import { Form, Input, Button } from "antd";
import { connect } from "dva";
import { DEVICE_KEY } from "@/config/constant";
import { useLocalStorage, useCountdown } from "@/hooks";
import { withRouter } from "umi";
function CheckOTP(props) {
  const { dispatch, forgotPassStore } = props;

  const [form] = Form.useForm();
  const [deviceKey] = useLocalStorage(DEVICE_KEY);
  let { loading, forgotAccount } = forgotPassStore;

  const timeExpiredOtp = 2 * 60; // 2 minutes
  const [days, hours, minutes, seconds] = useCountdown(timeExpiredOtp);

  const onSubmit = (values) => {
    values.account = forgotAccount;
    values.deviceKey = deviceKey;
    values.code = values["code"].trim();
    dispatch({
      type: "FORGOT_PASS/checkOtp",
      payload: values,
    });
  };

  const backStep = () => {
    dispatch({
      type: "FORGOT_PASS/backStep",
    });
  };

  const renderCountDown = useMemo(() => {
    if (minutes === 0 && seconds === 0) {
      return (
        <div className="mt-3">
          Mã xác thực của bạn đã hết hạn. Hãy gửi lại mã!
        </div>
      );
    } else {
      let formatMinute = minutes < 10 ? `0${minutes}` : minutes;
      let formatSecond = seconds < 10 ? `0${seconds}` : seconds;
      return (
        <div className="mt-3">
          Mã của bạn sẽ hết hạn sau: {formatMinute}:{formatSecond}
        </div>
      );
    }
  }, [minutes, seconds]);

  return (
    <>
      <h1 className={styles.formTitle}>Nhập mã bảo mật</h1>
      <h5 className={styles.formDesc}>
        Vui lòng kiểm tra mã trong email của bạn. Mã này gồm 6 số. <br />
        {renderCountDown}
      </h5>
      <Form
        scrollToFirstError
        layout="vertical"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label=""
          rules={[{ required: true, message: "Bạn chưa nhập mã xác thực!" }]}
          name="code"
        >
          <Input placeholder="Nhập mã xác thực" />
        </Form.Item>

        <div className={styles.cta}>
          <Button onClick={backStep} className={styles.backBtn}>
            Quay lại
          </Button>
          <Button
            loading={loading}
            htmlType="submit"
            className={styles.primaryBtn}
          >
            Tiếp tục
          </Button>
        </div>
      </Form>
    </>
  );
}

export default connect(({ FORGOT_PASS }) => ({
  forgotPassStore: FORGOT_PASS,
}))(withRouter(CheckOTP));
