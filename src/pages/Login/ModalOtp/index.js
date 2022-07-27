import React, { useState } from 'react';
import { connect } from 'dva';
import { Modal, Input, message } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './styles.scss';

function ModalOtp({ dispatch, masterDataStore, showOtp, setShowOtp }) {
    const { isLogin, mailResponse } = masterDataStore;
    const [otp, setOtp] = useState();

    const handleClose = () => {
        setShowOtp(false);
    };

    const handleConfirm = () => {
        if (!otp) {
            message.error(formatMessage({ id: 'REQUIRE_VALUE' }));
        } else {
            if (otp.trim() !== localStorage.getItem('code_tt')) {
                message.error(formatMessage({ id: 'WRONG_OTP' }));
            } else {
                dispatch({ type: 'MASTERDATA/confirmOTP' });
                handleClose();
            }
        }
    };

    const _handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleConfirm();
        }
    };

    return (
        <Modal
            title={formatMessage({ id: 'CONFIRM_OTP_FROM_EMAIL' })}
            visible={showOtp}
            wrapClassName={styles.modal}
            onOk={handleConfirm}
            okText={formatMessage({ id: 'SUBMIT' })}
            onCancel={handleClose}
            destroyOnClose
        >
            <div className={styles.listSecret}>
                <Input
                    onKeyPress={_handleKeyDown}
                    className={styles.textInputLight}
                    onChange={e => setOtp(e.target.value)}
                ></Input>
            </div>
        </Modal>
    );
}

export default connect(({ MASTERDATA }) => ({
    masterDataStore: MASTERDATA,
}))(ModalOtp);
