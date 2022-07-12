import React from 'react';
import styles from './styles.scss';
import { formatMessage } from 'umi-plugin-react/locale';
import Cleave from 'cleave.js/react';

export default function USDTPaymentRate() {
    const [amountDeposit, setAmountDeposit] = React.useState();

    const handleSubmit = values => {};

    const handleChange = e => {
        setAmountDeposit(e.currentTarget.rawValue);
    };

    return (
        <div className={styles.topup}>
            <h5 className="mb-5">{formatMessage({ id: 'USDT_PAYMENT_RATE' })}</h5>
            <div className={styles.form}>
                <div className="d-flex col-6 justify-content-between align-items-center">
                    <div>1 USDT</div>
                    <span className="mx-5">=</span>
                    <div className="flex-grow-1 d-flex align-items-center">
                        <Cleave
                            className={styles.textInput}
                            placeholder={formatMessage({ id: 'AMOUNT_IN_VND' })}
                            onChange={handleChange}
                            options={{
                                numeral: true,
                                numeralThousandsGroupStyle: 'thousand',
                            }}
                        />
                        <span className="ms-3">VNĐ</span>
                    </div>
                </div>

                <div className="mt-4 p-3 col-6 d-flex justify-content-end">
                    <button onClick={handleSubmit} className={styles.primaryBtn}>
                        {formatMessage({ id: 'SUBMIT' })}
                    </button>
                </div>
            </div>
        </div>
    );
}
