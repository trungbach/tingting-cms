import React from 'react';
import styles from './styles.scss';
import { Form, Input, Select } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import Cleave from 'cleave.js/react';

const { Option } = Select;
export default function AdminAddTransDeposit() {
    const [form] = Form.useForm();
    const [amountDeposit, setAmountDeposit] = React.useState();

    const handleSubmit = values => {};

    const handleChange = e => {
        setAmountDeposit(e.currentTarget.rawValue);
    };

    return (
        <div className={styles.topup}>
            <h5 className="mb-3">{formatMessage({ id: 'TOPUP' })}</h5>
            <div className={styles.form}>
                <Form layout="vertical" form={form} scrollToFirstError onFinish={handleSubmit}>
                    <div className="col-5">
                        <Form.Item
                            name="customer"
                            label={formatMessage({ id: 'CHOOSE_CUSTOMER' })}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <div className={styles.select}>
                                <Select style={{ minWidth: 180 }} defaultValue="">
                                    <Option value="">{formatMessage({ id: 'CUSTOMER' })}</Option>
                                    <Option value="23">Chờ xử lý</Option>
                                    <Option value="234">Đang xử lý</Option>
                                    <Option value="235">Hoàn thành</Option>
                                    <Option value="236">Từ chối</Option>
                                    <Option value="237">Khách hàng hủy giao dịch</Option>
                                </Select>
                            </div>{' '}
                        </Form.Item>
                    </div>
                    <div className="col-5">
                        <Form.Item
                            name="phone"
                            label={formatMessage({ id: 'CHOOSE_CHANNEL' })}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <div className={styles.select}>
                                <Select style={{ minWidth: 180 }} defaultValue="">
                                    <Option value="">{formatMessage({ id: 'CUSTOMER' })}</Option>
                                    <Option value="23">Chờ xử lý</Option>
                                    <Option value="234">Đang xử lý</Option>
                                    <Option value="235">Hoàn thành</Option>
                                    <Option value="236">Từ chối</Option>
                                    <Option value="237">Khách hàng hủy giao dịch</Option>
                                </Select>
                            </div>{' '}
                        </Form.Item>
                    </div>

                    <div className="row">
                        <div className="col-5">
                            <Form.Item
                                label={formatMessage({ id: 'ACCOUNT_TYPE' })}
                                name="email"
                                rules={[{ required: true }]}
                            >
                                <div className={styles.select}>
                                    <Select style={{ minWidth: 180 }} defaultValue="">
                                        <Option value="">
                                            {formatMessage({ id: 'CUSTOMER' })}
                                        </Option>
                                        <Option value="23">Chờ xử lý</Option>
                                        <Option value="234">Đang xử lý</Option>
                                        <Option value="235">Hoàn thành</Option>
                                        <Option value="236">Từ chối</Option>
                                        <Option value="237">Khách hàng hủy giao dịch</Option>
                                    </Select>
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <Form.Item
                                label={formatMessage({ id: 'AMOUNT' })}
                                name="amount"
                                rules={[{ required: true }]}
                            >
                                <Cleave
                                    className={styles.textInput}
                                    placeholder="0"
                                    onChange={handleChange}
                                    options={{
                                        numeral: true,
                                        numeralThousandsGroupStyle: 'thousand',
                                    }}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="p-3 col-5 d-flex justify-content-end">
                        <button htmlType="submit" className={styles.primaryBtn}>
                            {formatMessage({ id: 'SUBMIT' })}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
