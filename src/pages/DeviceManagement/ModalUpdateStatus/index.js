import React, { useState } from 'react';
import styles from './styles.scss';
import { formatMessage } from 'umi-plugin-react/locale';
import { Select, Modal } from 'antd';
import { DeviceStatusValue, DeviceStatus } from '@/config/constant';
import { connect } from 'dva';

const { Option } = Select;

function ModalUpdateStatus({ dispatch, currentUpdate, setCurrentUpdate }) {
    const [status, setStatus] = useState(DeviceStatus[currentUpdate.status]);

    const handleClose = () => {
        setCurrentUpdate({
            ...currentUpdate,
            showStatus: false,
        });
    };

    const handleSubmit = () => {
        const payload = {
            id: currentUpdate.id,
            status: DeviceStatusValue[status],
        };
        dispatch({ type: 'DEVICE/updateStatus', payload });
        handleClose();
    };

    return (
        <>
            <Modal
                title={formatMessage({ id: 'CHANGE_STATUS' })}
                visible={currentUpdate.showStatus}
                wrapClassName={styles.modal}
                onOk={handleSubmit}
                okText={formatMessage({ id: 'SUBMIT' })}
                onCancel={handleClose}
                destroyOnClose
            >
                <div className={styles.form}>
                    <Select
                        style={{ minWidth: 180 }}
                        defaultValue={DeviceStatus[currentUpdate.status]}
                        onChange={value => setStatus(value)}
                    >
                        {Object.keys(DeviceStatusValue).map((item, index) => {
                            return <Option value={item}>{formatMessage({ id: `${item}` })}</Option>;
                        })}
                    </Select>
                </div>
            </Modal>
        </>
    );
}
export default connect(({ DEVICE }) => ({
    deviceStore: DEVICE,
}))(ModalUpdateStatus);
