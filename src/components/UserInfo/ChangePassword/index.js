import React, { useState } from 'react';
import styles from './styles.scss';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form, Input, Select, Modal } from 'antd';
const { Option } = Select;

export default function ChangePassword({ isModalVisible, setIsModalVisible }) {
    const [form] = Form.useForm();
    const handleSubmit = values => {};

    const handleClose = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <Modal
                title={formatMessage({ id: 'CHANGE_PASSWORD' })}
                visible={isModalVisible}
                wrapClassName={styles.modal}
                onOk={() => form.submit()}
                okText={formatMessage({ id: 'SUBMIT' })}
                onCancel={handleClose}
                destroyOnClose
            >
                <div className={styles.password}>
                    <ul>
                        <li style={{ color: 'rgb(39 22 22)' }}>
                            password length should be between 8 and 32 symbols;
                        </li>
                        <li style={{ color: 'rgb(39 22 22)' }}>
                            at least 1 upper case character; at least 1 lower case character;
                        </li>
                        <li style={{ color: 'rgb(39 22 22)' }}>at least 1 number;</li>
                        <li style={{ color: 'rgb(39 22 22)' }}>
                            at least 1 special character, for example: !@#$
                        </li>
                    </ul>
                </div>
                <div className={styles.form}>
                    <Form layout="vertical" form={form} scrollToFirstError onFinish={handleSubmit}>
                        <Form.Item
                            label={formatMessage({ id: 'OLD_PASSWORD' })}
                            name="oldPass"
                            rules={[{ required: true }]}
                        >
                            <Input.Password className={styles.textInputLight}></Input.Password>
                        </Form.Item>
                        <Form.Item
                            label={formatMessage({ id: 'NEW_PASSWORD' })}
                            name="newPass"
                            rules={[{ required: true }]}
                        >
                            <Input.Password className={styles.textInputLight}></Input.Password>
                        </Form.Item>
                        <Form.Item
                            label={formatMessage({ id: 'CONFIRM_NEW_PASSWORD' })}
                            name="confirmNewPass"
                            rules={[{ required: true }]}
                        >
                            <Input.Password className={styles.textInputLight}></Input.Password>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
