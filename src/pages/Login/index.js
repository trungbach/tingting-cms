/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import styles from './styles.scss';
import { Form, Input, Checkbox } from 'antd';
import { connect } from 'dva';
import { Link, router } from 'umi';
import { setLocale, formatMessage, getLocale } from 'umi-plugin-react/locale';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

function Login({ dispatch, masterDataStore }) {
    let { isFirstLogin, isLogin } = masterDataStore;
    // const locales = getLocale();
    // console.log('locales', locales);
    setLocale('en-US');
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
        values.password = values['password'].trim();
        dispatch({
            type: 'MASTERDATA/login',
            payload: values,
        });
    };

    const _handleKeyDown = e => {
        if (e.key === 'Enter') {
            const nextSibling = document.querySelector(`input[name=password]`);
            if (nextSibling !== null) {
                nextSibling.focus();
            }
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.loginForm}>
                <div className={styles.form}>
                    <div className={styles.formTitle}>
                        <h3>{formatMessage({ id: 'LET_GET_STARTED' })}</h3>
                        <p>{formatMessage({ id: 'SIGN_IN_TO_CONTINUE_TO_SPECIE' })}</p>
                    </div>
                    <Form scrollToFirstError layout="vertical" onFinish={onSubmit} form={form}>
                        <Form.Item
                            label=""
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({ id: 'PLEASER_ENTER_USERNAME' }),
                                },
                            ]}
                            name="username"
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder={formatMessage({ id: 'USERNAME' })}
                                onKeyPress={_handleKeyDown}
                            />
                        </Form.Item>
                        <Form.Item
                            label=""
                            rules={[
                                {
                                    required: true,
                                    message: formatMessage({ id: 'PLEASER_ENTER_PASSWORD' }),
                                },
                            ]}
                            name="password"
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder={formatMessage({ id: 'PASSWORD' })}
                                name="password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Link
                                to="/forgot-password"
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    display: 'inline-flex',
                                    alignItems: 'baseline',
                                }}
                            >
                                <LockOutlined className="me-2" />
                                {formatMessage({ id: 'FORGOT_PASSWORD' })}
                            </Link>
                        </Form.Item>
                        <button htmltype="submit" className={styles.signInBtn}>
                            {formatMessage({ id: 'SIGN_IN' })}
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default connect(({ MASTERDATA }) => ({
    masterDataStore: MASTERDATA,
}))(Login);
