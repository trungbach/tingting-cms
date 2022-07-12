import React from 'react';
import styles from './styles.scss';
import { Form, Input, Select } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import Cleave from 'cleave.js/react';

const { Option } = Select;
export default function AdminAddTransWithdraw() {
    const [form] = Form.useForm();
    const [amountDeposit, setAmountDeposit] = React.useState();

    const handleSubmit = values => {};

    const handleChange = e => {
        setAmountDeposit(e.currentTarget.rawValue);
    };

    return (
        <div className={styles.addWithdraw}>
            <h5 className="mb-3">{formatMessage({ id: 'ADD_WITHDRAW_REQUEST' })}</h5>

            <div className={styles.form}>
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 14 }}
                    form={form}
                    scrollToFirstError
                    onFinish={handleSubmit}
                >
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
                    <Form.Item
                        name="phone"
                        label={formatMessage({ id: 'ACCOUNT_IN' })}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <div className={styles.select}>
                            <Select style={{ minWidth: 180 }} defaultValue="">
                                <Option value="">{formatMessage({ id: 'CUSTOMER' })}</Option>
                                <Option value="237">Khách hàng hủy giao dịch</Option>
                            </Select>
                        </div>{' '}
                    </Form.Item>

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
                    <div className="p-3 col-9 d-flex justify-content-end">
                        <button htmlType="submit" className={styles.primaryBtn}>
                            {formatMessage({ id: 'SUBMIT' })}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
