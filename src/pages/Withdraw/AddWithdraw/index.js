import React, { useEffect } from 'react';
import styles from './styles.scss';
import { Form, Input, Select, message } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import Cleave from 'cleave.js/react';
import AddRecipient from './AddRecipient';
import { connect } from 'dva';

const { Option } = Select;
function AddWithdraw({ dispatch, withdrawStore }) {
    const { listCardBank, addCardResponse } = withdrawStore;
    const [form] = Form.useForm();
    const [amountDeposit, setAmountDeposit] = React.useState();

    console.log('listCardBank', listCardBank);

    useEffect(() => {
        dispatch({ type: 'WITHDRAW/getCardBank' });
    }, [dispatch, addCardResponse]);

    const handleSubmit = values => {
        if (amountDeposit <= 0) {
            message.error(formatMessage({ id: 'REQUIRE_VALUE' }));
            return;
        }
        const payload = {
            ...values,
            totalMoney: amountDeposit,
        };
        dispatch({ type: 'WITHDRAW/createWithdraw', payload });
    };

    const handleChange = e => {
        setAmountDeposit(Number(e.currentTarget.rawValue));
    };

    return (
        <div className={styles.addWithdraw}>
            <h5 className="mb-3">{formatMessage({ id: 'ADD_WITHDRAW_REQUEST' })}</h5>

            <AddRecipient />

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
                        label={formatMessage({ id: 'ACCOUNT_IN' })}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select style={{ minWidth: 180 }}>
                            {listCardBank.map((item, index) => {
                                return (
                                    <Option key={index} value={item.id}>
                                        <span>{item.bankName}</span>
                                        <span className="mx-2">-</span>
                                        <span>{item.numberAccount}</span>
                                        <span className="mx-2">-</span>
                                        <span>{item.username}</span>
                                    </Option>
                                );
                            })}
                        </Select>
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
