import React from "react";
import styles from "./styles.scss";
import { Form, Input, Button } from "antd";
import { connect } from "dva";
import { DEVICE_KEY } from "@/config/constant";
import { useLocalStorage } from "@/hooks";
import { withRouter } from "umi";

function EnterNewPassword(props) {
  const { dispatch, forgotPassStore } = props;

  const [form] = Form.useForm();
  const [deviceKey] = useLocalStorage(DEVICE_KEY);
  const { loading, forgotAccount, code } = forgotPassStore;

  const onSubmit = (values) => {
    values.account = forgotAccount;
    values.code = code;
    values.deviceKey = deviceKey;
    values.password = values["password"].trim();
    values.confirmPassword = values["confirmPassword"].trim();
    if (values.confirmPassword !== values.password) {
      message.error("Xác nhận mật khẩu mới không khớp");
      return;
    }
    delete values.confirmPassword;
    dispatch({
      type: "FORGOT_PASS/changePasswordForgot",
      payload: values,
    });
  };

  const backStep = () => {
    dispatch({
      type: "FORGOT_PASS/backStep",
    });
  };

  return (
    <>
      <h1 className={styles.formTitle}>Tạo mật khẩu mới</h1>
      <Form
        scrollToFirstError
        layout="vertical"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label=""
          rules={[{ required: true, message: "Bạn chưa nhập mật khẩu mới!" }]}
          name="password"
        >
          <Input.Password minLength={6} placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item
          label=""
          rules={[
            { required: true, message: "Bạn chưa nhập xác nhận mật khẩu mới!" },
          ]}
          name="confirmPassword"
        >
          <Input.Password minLength={6} placeholder="Xác nhận mật khẩu mới" />
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
}))(withRouter(EnterNewPassword));
