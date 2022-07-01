import React from "react";
import styles from "./styles.scss";
import { Form, Input, Button, message } from "antd";
import { connect } from "dva";

function ChangePassword({ dispatch, masterDataStore }) {
  let { loading } = masterDataStore;

  const onSubmit = (values) => {
    values.oldPass = values["oldPass"].trim();
    values.newPass = values["newPass"].trim();
    values.confirmNewPass = values["confirmNewPass"].trim();
    if (values.oldPass === values.newPass) {
      message.error("Mật khẩu mới không được trùng mật khẩu cũ!");
      return;
    }
    if (values.confirmNewPass !== values.newPass) {
      message.error("Xác nhận mật khẩu mới không khớp!");
      return;
    } else if (values.newPass.length < 6) {
      message.warning("Mật khẩu tối thiểu 6 ký tự!");
      return;
    }
    delete values.confirmNewPass;
    dispatch({
      type: "MASTERDATA/changePassword",
      payload: values,
    });
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Get the next input field
      const nextSibling = document.querySelector(`input[name=password]`);

      // If found, focus the next field
      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <div className={styles.form}>
          <h1 className={styles.formTitle}>Đổi mật khẩu</h1>
          <Form scrollToFirstError layout="vertical" onFinish={onSubmit}>
            <Form.Item
              rules={[
                { required: true, message: "Bạn chưa nhập mật khẩu cũ!" },
              ]}
              name="oldPass"
            >
              <Input.Password
                placeholder="Mật khẩu cũ"
                onKeyPress={_handleKeyDown}
              />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Bạn chưa nhập mật khẩu mới!" },
              ]}
              name="newPass"
            >
              <Input.Password
                minLength={6}
                placeholder="Mật khẩu mới"
                name="password"
              />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "Bạn chưa xác nhận mật khẩu mới!" },
              ]}
              name="confirmNewPass"
            >
              <Input.Password
                minLength={6}
                placeholder="Xác nhận mật khẩu mới"
                name="password"
              />
            </Form.Item>

            <Button
              loading={loading}
              htmlType="submit"
              className={styles.primaryBtn}
            >
              Đổi mật khẩu
            </Button>
          </Form>
        </div>
      </div>
      <div className={styles.loginImg}></div>
    </div>
  );
}

export default connect(({ MASTERDATA }) => ({
  masterDataStore: MASTERDATA,
}))(ChangePassword);
