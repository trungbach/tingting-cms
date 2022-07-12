import { Modal, Select, Form, Input } from 'antd';
import { connect } from 'dva';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './styles.scss';
const { Option } = Select;

const { confirm } = Modal;

const DeviceManagement = props => {
    const { dispatch } = props;
    const [form] = Form.useForm();
    const handleSubmit = values => {
        // dispatch({ type: 'MASTERDATA/updateProfile', payload: values });
    };
    return (
        <div className={styles.content}>
            <div className={styles.pageTitle}>
                <h5>{formatMessage({ id: 'TRANFER_BALANCE' })}</h5>
            </div>

            <div className={styles.form}>
                <div className={styles.form}>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        form={form}
                        scrollToFirstError
                        onFinish={handleSubmit}
                    >
                        {/* <Form.Item label={formatMessage({ id: 'MERCHANT_BALANCE' })} name="">
                            <div className={styles.moneyColor}>đ999</div>
                        </Form.Item> */}

                        <Form.Item
                            label={formatMessage({ id: 'BANK' })}
                            name="bank"
                            rules={[{ required: true }]}
                        >
                            <div className={styles.select}>
                                <Select style={{ minWidth: 180 }} defaultValue="">
                                    <Option value={0}>Chờ xử lý</Option>
                                    <Option value={1}>Đang xử lý</Option>
                                    <Option value={2}>Hoàn thành</Option>
                                    <Option value={3}>Từ chối</Option>
                                    <Option value={4}>Khách hàng hủy giao dịch</Option>
                                </Select>
                            </div>{' '}
                        </Form.Item>
                        <Form.Item
                            label={formatMessage({ id: 'ACCOUNT_HOLDER' })}
                            name="newPass"
                            rules={[{ required: true }]}
                        >
                            <Input className={styles.textInput}></Input>
                        </Form.Item>
                        <Form.Item
                            label={formatMessage({ id: 'RECIPIENT_ACC' })}
                            name="confirmNewPass"
                            rules={[{ required: true }]}
                        >
                            <div className={styles.select}>
                                <Select style={{ minWidth: 180 }} defaultValue="">
                                    <Option value={0}>Chờ xử lý</Option>
                                    <Option value={1}>Đang xử lý</Option>
                                    <Option value={2}>Hoàn thành</Option>
                                    <Option value={3}>Từ chối</Option>
                                    <Option value={4}>Khách hàng hủy giao dịch</Option>
                                </Select>
                            </div>{' '}
                        </Form.Item>
                        <Form.Item
                            label={formatMessage({ id: 'AMOUNT' })}
                            name="amount"
                            rules={[{ required: true }]}
                        >
                            <Input className={styles.textInput}></Input>
                        </Form.Item>
                        <Form.Item
                            label={formatMessage({ id: 'VERIFICATION_CODE' })}
                            name="confirmNewPass1"
                            rules={[{ required: true }]}
                        >
                            <Input className={styles.textInput}></Input>
                        </Form.Item>
                        <Form.Item
                            label={formatMessage({ id: 'TRANSFER_CONTENT' })}
                            name="confirmNewPass2"
                        >
                            <Input.TextArea rows={5} className={styles.textInput}></Input.TextArea>
                        </Form.Item>

                        <div className="d-flex justify-content-end">
                            <button htmlType="submit" className={styles.primaryBtn}>
                                {formatMessage({ id: 'SUBMIT' })}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default connect(({ MASTERDATA, COMPANY }) => ({
    companyStore: COMPANY,
    masterDataStore: MASTERDATA,
}))(DeviceManagement);
