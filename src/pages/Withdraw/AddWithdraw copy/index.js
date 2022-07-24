import React, { useEffect } from 'react';
import styles from './styles.scss';
import { Form, Input, Select } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import Cleave from 'cleave.js/react';
import AddRecipient from './AddRecipient';
import { connect } from 'dva';

const { Option } = Select;
function AddWithdraw({ dispatch, withdrawStore }) {
    const { listDevices } = withdrawStore;
    console.log('listDevices', listDevices);
    const [form] = Form.useForm();
    const [amountDeposit, setAmountDeposit] = React.useState();

    useEffect(() => {
        let payload = {
            page: 0,
        };
        dispatch({ type: 'WITHDRAW/getDevices', payload });
    }, [dispatch]);

    const handleSubmit = values => {
        const payload = { ...values, totalMoney: Number(amountDeposit), paymentType: 1 };
        dispatch({ type: 'WITHDRAW/createWithdraw', payload });
    };

    const handleChange = e => {
        setAmountDeposit(e.currentTarget.rawValue);
    };

    return (
        <div className={styles.addWithdraw}>
            <h5 className="mb-3">{formatMessage({ id: 'ADD_WITHDRAW_REQUEST' })}</h5>

            {/* <AddRecipient /> */}
            <div className={styles.form}>
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 14 }}
                    form={form}
                    scrollToFirstError
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="userCardBankId"
                        label={formatMessage({ id: 'ACCOUNT_OUT' })}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select style={{ minWidth: 180 }} defaultValue="">
                            {listDevices.map((item, index) => {
                                return (
                                    <Option key={index} value={item.id}>
                                        <span>{item.bankName}</span>
                                        {' - '}
                                        <span>{item.numberAccount}</span>
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="bankAccount"
                        label={formatMessage({ id: 'ACCOUNT_NUMBER' })}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input className={styles.textInput} />
                    </Form.Item>

                    <Form.Item
                        name="bankUsername"
                        label={formatMessage({ id: 'ACCOUNT_HOLDER' })}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input className={styles.textInput} />
                    </Form.Item>
                    <Form.Item
                        name="bankName"
                        label={formatMessage({ id: 'BANK_NAME' })}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input className={styles.textInput} />
                    </Form.Item>

                    <Form.Item
                        label={formatMessage({ id: 'AMOUNT' })}
                        name="totalMoney"
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

export default connect(({ WITHDRAW }) => ({
    withdrawStore: WITHDRAW,
}))(AddWithdraw);
