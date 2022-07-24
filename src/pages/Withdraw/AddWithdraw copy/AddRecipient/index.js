import React, { useState } from 'react';
import styles from './styles.scss';
import { formatMessage } from 'umi-plugin-react/locale';
import { Form, Input, Select, Modal } from 'antd';
const { Option } = Select;

export default function AddRecipient() {
    const [isModal, setIsModal] = useState(false);
    const [form] = Form.useForm();
    const handleSubmit = values => {};

    const handleClose = () => {
        setIsModal(false);
    };
    return (
        <>
            <div className={styles.addRecip}>
                <span className={styles.add} onClick={() => setIsModal(true)}>
                    +
                </span>
                <b>{formatMessage({ id: 'NEW_RECIPIENT' })}</b>
            </div>
            <Modal
                title={formatMessage({ id: 'SET_UP_NEW_WITHDRAW_ACCOUNT' })}
                visible={isModal}
                wrapClassName={styles.modal}
                onOk={() => form.submit()}
                onCancel={handleClose}
                destroyOnClose
            >
                <div className={styles.form}>
                    <Form layout="vertical" form={form} scrollToFirstError onFinish={handleSubmit}>
                        <Form.Item
                            label={formatMessage({ id: 'BANK' })}
                            rules={[{ required: true }]}
                            name="bank"
                        >
                            <Select
                                dropdownClassName={styles.modalSelect}
                                style={{ minWidth: 180 }}
                                defaultValue=""
                            >
                                <Option value="">{formatMessage({ id: 'CUSTOMER' })}</Option>
                                <Option value="237">Khách hàng hủy giao dịch</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={formatMessage({ id: 'ACCOUNT_NUMBER' })}
                            rules={[{ required: true }]}
                            name="address2"
                        >
                            <Input className={styles.textInputLight} />
                        </Form.Item>
                        <Form.Item
                            label={formatMessage({ id: 'ACCOUNT_HOLDER' })}
                            rules={[{ required: true }]}
                            name="address1"
                        >
                            <Input className={styles.textInputLight} />
                        </Form.Item>
                        <Form.Item
                            label={formatMessage({ id: 'VERIFICATION_CODE' })}
                            rules={[{ required: true }]}
                            name="addresss"
                        >
                            <Input type="password" className={styles.textInputLight} />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
