import { Form, Select } from 'antd';
import Cleave from 'cleave.js/react';
import { connect } from 'dva';
import React, { useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './styles.scss';
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
function TopUp({ dispatch, depositStore }) {
    const { listPaymentType } = depositStore;
    const [form] = Form.useForm();
    const [amount, setAmount] = React.useState();

    useEffect(() => {
        dispatch({ type: 'DEPOSIT/getPaymentType' });
    }, [dispatch]);

    const handleSubmit = values => {
        values.totalMoney = amount;
        const payload = { ...values };
        dispatch({ type: 'DEPOSIT/createDeposit', payload });
    };

    const handleChangeAmount = e => {
        setAmount(Number(e.currentTarget.rawValue));
    };

    const key = 'sortNameBank';
    const arrayUniqueByBankName = [
        ...new Map(
            listPaymentType.filter(i => i.sortNameBank !== 'USDT').map(item => [item[key], item]),
        ).values(),
    ];

    return (
        <div className={styles.content}>
            <div className={styles.topup}>
                <h5 className="mb-3">{formatMessage({ id: 'TOPUP' })}</h5>
                <div className={styles.form}>
                    <Form
                        {...formItemLayout}
                        layout="vertical"
                        form={form}
                        scrollToFirstError
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label={formatMessage({ id: 'ACCOUNT_RECEIPT' })}
                            name="bankId"
                            rules={[{ required: true }]}
                        >
                            <Select style={{ minWidth: 180 }}>
                                {arrayUniqueByBankName
                                    .filter(i => i.sortNameBank)
                                    .map((item, index) => {
                                        return <Option value={item.id}>{item.sortNameBank}</Option>;
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
                                onChange={handleChangeAmount}
                                options={{
                                    numeral: true,
                                    numeralThousandsGroupStyle: 'thousand',
                                }}
                            />
                        </Form.Item>

                        <div className="p-3 col-6 d-flex justify-content-end">
                            <button htmlType="submit" className={styles.primaryBtn}>
                                {formatMessage({ id: 'SUBMIT' })}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default connect(({ DEPOSIT }) => ({
    depositStore: DEPOSIT,
}))(TopUp);
