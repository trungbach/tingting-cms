import { message, Modal, Select } from 'antd';
import Cleave from 'cleave.js/react';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './styles.scss';
import ModalLoading from '@/components/ModalLoading';
import { formatVnd } from '@/util/function';

function compare(a, b) {
    if (a.totalMoney < b.totalMoney) {
        return 1;
    }
    if (a.totalMoney > b.totalMoney) {
        return -1;
    }
    return 0;
}

function ModalApprove({ dispatch, currentTrans, setCurrentTrans, withdrawStore }) {
    const { listDevices } = withdrawStore;

    const [maxBalanceDevice, setMaxBalanceDevice] = useState();

    useEffect(() => {
        const payload = {
            page: 0,
            status: 'on',
        };
        dispatch({ type: 'WITHDRAW/getDevices', payload });
    }, [dispatch]);

    useEffect(() => {
        if (listDevices.length) {
            const maxBalanceDevice = listDevices.sort(compare)[0];
            maxBalanceDevice && setMaxBalanceDevice(maxBalanceDevice.id);
        }
    }, [listDevices]);

    const handleClose = () => {
        setCurrentTrans({
            ...currentTrans,
            isShow: false,
        });
    };

    const handleSubmit = () => {
        const payload = {
            id: currentTrans.id,
            mobileId: maxBalanceDevice,
        };
        dispatch({ type: 'WITHDRAW/approveTransaction', payload });
        handleClose();
    };

    if (!listDevices.length || !maxBalanceDevice) {
        return <ModalLoading />;
    }

    return (
        <Modal
            title={formatMessage({ id: 'APPROVE_WITHRAW_REQUEST' })}
            visible={currentTrans.isShow}
            wrapClassName={styles.modal}
            onOk={handleSubmit}
            okText={formatMessage({ id: 'SUBMIT' })}
            onCancel={handleClose}
            destroyOnClose
        >
            <div className={styles.form}>
                <div>{formatMessage({ id: 'SELECT_PAYMENT_ACCOUNT' })}:</div>
                <Select
                    // style={{ minWidth:  }}
                    defaultValue={maxBalanceDevice}
                    onChange={value => setMaxBalanceDevice(value)}
                >
                    {listDevices.map((item, index) => {
                        return (
                            <Select.Option key={index} value={item.id}>
                                <span>{item.bankName}</span>
                                {' - '}
                                <span>{item.numberAccount}</span>
                                {' - '}
                                <span>{formatVnd(item.totalMoney)}</span>
                            </Select.Option>
                        );
                    })}
                </Select>
            </div>
        </Modal>
    );
}
export default connect(({ WITHDRAW }) => ({
    withdrawStore: WITHDRAW,
}))(ModalApprove);
