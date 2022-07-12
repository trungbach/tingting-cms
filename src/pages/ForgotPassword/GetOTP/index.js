import React from 'react';
import styles from './styles.scss';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';
import { router } from 'umi';

function GetOTP(props) {
    const { dispatch, forgotPassStore } = props;
    const [form] = Form.useForm();
    let { loading } = forgotPassStore;

    const onSubmit = values => {
        values.account = values['account'].trim();
        dispatch({
            type: 'FORGOT_PASS/sendOtp',
            payload: values,
        });
    };

    const backToLogin = () => {
        router.push('/login');
    };

    return (
        <>
            <h1 className={styles.formTitle}>Đặt lại mật khẩu</h1>

            <Form scrollToFirstError layout="vertical" onFinish={onSubmit} form={form}>
                <Form.Item
                    label="Tài khoản"
                    rules={[{ required: true, message: 'Bạn chưa nhập tài khoản!' }]}
                    name="account"
                >
                    <Input placeholder="Nhập tài khoản" />
                </Form.Item>

                <div className={styles.cta}>
                    <Button onClick={backToLogin} className={styles.backBtn}>
                        Quay lại
                    </Button>
                    <Button loading={loading} htmlType="submit" className={styles.primaryBtn}>
                        Xác nhận
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default connect(({ FORGOT_PASS }) => ({
    forgotPassStore: FORGOT_PASS,
}))(GetOTP);
