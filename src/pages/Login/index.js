import React, { useEffect } from 'react';
import styles from './styles.scss';
import { Form, Input } from 'antd';
import { connect } from 'dva';
import { Link, router } from 'umi';
import ModalExpired from '@/components/ModalExpired';
import { setLocale, formatMessage } from 'umi-plugin-react/locale';

function Login({ dispatch, masterDataStore }) {
    let { isFirstLogin, isLogin } = masterDataStore;

    useEffect(() => {
        if (isFirstLogin) {
            router.push('/change-first-password');
        }

        if (isLogin) {
            router.push('/admin/overview');
        }
    }, [isFirstLogin, isLogin]);
    const [form] = Form.useForm();

    const onSubmit = values => {
        values.username = values['username'].trim();
        values.passwordRequest = values['passwordRequest'].trim();
        dispatch({
            type: 'MASTERDATA/login',
            payload: values,
        });
    };

    const _handleKeyDown = e => {
        if (e.key === 'Enter') {
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
                    <h1 className={styles.formTitle}>Đăng nhập</h1>
                    <Form scrollToFirstError layout="vertical" onFinish={onSubmit} form={form}>
                        <Form.Item
                            label=""
                            rules={[{ required: true, message: 'Bạn chưa nhập tài khoản!' }]}
                            name="username"
                        >
                            <Input placeholder="Nhập tài khoản" onKeyPress={_handleKeyDown} />
                        </Form.Item>
                        <Form.Item
                            label=""
                            rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu!' }]}
                            name="passwordRequest"
                        >
                            <Input.Password placeholder="Mật khẩu" name="password" />
                        </Form.Item>
                        <button htmltype="submit" className={styles.primaryBtn}>
                            Đăng nhập
                        </button>
                    </Form>
                </div>
            </div>
            <div className={styles.loginImg}></div>
        </div>
    );
}

export default connect(({ MASTERDATA }) => ({
    masterDataStore: MASTERDATA,
}))(Login);
