import { Button } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import ModalLoading from '../../components/ModalLoading';
import styles from './styles.scss';
import { withRouter, router } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';
import { formatVnd } from '@/util/function';
function Payment({ location }) {
    const [timeLeft, setTimeLeft] = useState();
    const { query } = location;
    useEffect(() => {
        if (query) {
            const current = new Date();
            current.setMinutes(current.getMinutes() + 300 / 60);
            setTimeLeft(current);
        }
    }, [query]);

    if (!query) {
        return <ModalLoading />;
    }

    console.log('time', timeLeft);

    const handleClose = () => {
        window.open('', '_self', '');
        window.close();
    };
    return (
        <div className={styles.container}>
            <h2 className="mb-4">{formatMessage({ id: 'INFO_TRANSFER_BANK' })}:</h2>
            <div style={{ background: 'rgb(227,225,225)', padding: 30 }}>
                {query.linkImage === 'null' && (
                    <>
                        <h3>
                            {formatMessage({ id: 'ACCOUNT_NUMBER' })}: {query.bankAccount}
                        </h3>
                        <h3 className="my-3">
                            {formatMessage({ id: 'BANK_NAME' })}: {query.bankName}
                        </h3>
                        <h3>
                            {formatMessage({ id: 'ACCOUNT_HOLDER' })}: {query.bankUsername}
                        </h3>
                    </>
                )}

                <h3>
                    {formatMessage({ id: 'AMOUNT' })}: {formatVnd(query.amount)}
                </h3>
                <h3 className="mt-3">
                    {formatMessage({ id: 'MONEY_TRANSFER_CONTENT' })}:{' '}
                    <span style={{ fontWeight: 'bold', color: 'red' }}>{query.content}</span>
                </h3>
                {query.linkImage !== 'null' && (
                    <h3 className="mt-3">
                        {formatMessage({ id: 'QR_CODE' })}:{' '}
                        <div className="mt-3">
                            <img
                                style={{
                                    width: 150,
                                    height: 150,
                                }}
                                src={query.linkImage}
                                alt="qr-link"
                            />
                        </div>
                    </h3>
                )}
            </div>
            {/* <div>
                <p className="mt-3 d-flex">
                    {formatMessage({ id: 'DO_NOT_PAY_MORE_THAN_THE_FOLLOWING_TIME' })}:
                    <div style={{ fontWeight: 'bold', marginLeft: 3 }}>
                        {timeLeft?.getHours()} {formatMessage({ id: 'HOUR' })}{' '}
                        {timeLeft?.getMinutes()} {formatMessage({ id: 'MINUTE' })}
                    </div>
                </p>
            </div> */}
            <div className="d-flex justify-content-center mt-4">
                <Button
                    style={{ color: '#fff', background: '#3f3f65', borderRadius: '20px' }}
                    className="primary"
                    size="large"
                    onClick={handleClose}
                >
                    {formatMessage({ id: 'COMPLETE' })}
                </Button>
            </div>
            <div
                className="mt-3 d-flex justify-content-center"
                style={{ color: 'red', fontSize: 14 }}
            >
                {formatMessage({ id: 'NOTICE_PAYMENT' })}
            </div>
        </div>
    );
}
export default connect(({ MASTERDATA }) => ({
    masterDataStore: MASTERDATA,
}))(withRouter(Payment));
