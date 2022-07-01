import React, { useEffect } from "react";
import styles from "./styles.scss";
import { Form, Input, Button, message } from "antd";
import { connect } from "dva";
import { router } from "umi";
function ChangePasswordInit(props) {
  const { dispatch, masterDataStore } = props;
  let { loading, changePasswordSuccess } = masterDataStore;

  useEffect(() => {
    if (changePasswordSuccess) {
      router.push("/login");
    }
  }, [changePasswordSuccess]);

  const onSubmit = (values) => {
    values.oldPass = values["oldPass"].trim();
    values.newPass = values["newPass"].trim();
    values.newPassConfirm = values["newPassConfirm"].trim();
    if (values.oldPass === values.newPass) {
      message.error("Mật khẩu mới không được trùng mật khẩu cũ!");
      return;
    }
    if (values.newPass !== values.newPassConfirm) {
      message.warning("Xác nhận mật khẩu mới không khớp!");
      return;
    } else if (values.newPass.length < 6) {
      message.warning("Mật khẩu tối thiểu 6 ký tự!");
      return;
    }

    delete values.newPassConfirm;

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
          <h5 className={styles.formDesc}>
            Bạn cần cập nhật mật khẩu vì đây là lần đầu đăng nhập
          </h5>
          <Form scrollToFirstError layout="vertical" onFinish={onSubmit}>
            <Form.Item
              label=""
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
              label=""
              rules={[
                { required: true, message: "Bạn chưa nhập mật khẩu mới!" },
              ]}
              name="newPass"
            >
              <Input.Password placeholder="Mật khẩu mới" />
            </Form.Item>
            <Form.Item
              label=""
              rules={[
                { required: true, message: "Bạn chưa xác nhận mật khẩu mới!" },
              ]}
              name="newPassConfirm"
            >
              <Input.Password
                placeholder="Nhập lại mật khẩu mới"
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
}))(ChangePasswordInit);
