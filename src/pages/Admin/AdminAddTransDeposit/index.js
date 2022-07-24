import React, { useEffect } from 'react';
import styles from './styles.scss';
import { Form, Input, Select } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import Cleave from 'cleave.js/react';
import { connect } from 'dva';
import { RoleName, Role } from '@/config/constant';

const { Option } = Select;
function AdminAddTransDeposit({ adminStore, dispatch }) {
    const { listPaymentType, listMerchant } = adminStore;
    const [form] = Form.useForm();
    const [amountDeposit, setAmountDeposit] = React.useState();

    useEffect(() => {
        dispatch({ type: 'ADMIN/getPaymentType' });
    }, [dispatch]);

    useEffect(() => {
        const payload = {
            page: 0,
            role: RoleName[Role.ROLE_USER],
        };
        dispatch({ type: 'ADMIN/getMerchants', payload });
    }, [dispatch]);

    const handleSubmit = values => {
        const payload = { ...values };
        payload.totalMoney = amountDeposit;
        console.log('payload', payload);
    };

    const handleChange = e => {
        setAmountDeposit(Number(e.currentTarget.rawValue));
    };
    const key = 'sortNameBank';
    const arrayUniqueByBankName = [
        ...new Map(listPaymentType.map(item => [item[key], item])).values(),
    ];
    return (
        <div className={styles.topup}>
            <h5 className="mb-3">{formatMessage({ id: 'TOPUP' })}</h5>
            <div className={styles.form}>
                <Form layout="vertical" form={form} scrollToFirstError onFinish={handleSubmit}>
                    <div className="row">
                        <div className="col-5">
                            <Form.Item
                                label={formatMessage({ id: 'MERCHANT' })}
                                name="email"
                                rules={[{ required: true }]}
                            >
                                <Select style={{ minWidth: 180 }}>
                                    {listMerchant.map(item => {
                                        return <Option value={item.id}>{item.phone}</Option>;
                                    })}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>

                    <div className="col-5">
                        <Form.Item
                            label={formatMessage({ id: 'ACCOUNT_RECEIPT' })}
                            name="bankId"
                            rules={[{ required: true }]}
                        >
                            <Select style={{ minWidth: 180 }}>
                                {arrayUniqueByBankName.map((item, index) => {
                                    return <Option value={item.id}>{item.sortNameBank}</Option>;
                                })}
                            </Select>
                        </Form.Item>
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
export default connect(({ ADMIN }) => ({
    adminStore: ADMIN,
}))(AdminAddTransDeposit);
