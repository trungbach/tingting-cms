import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'umi';
import { Input, message } from 'antd';
import ModalLoading from '@/components/ModalLoading';
import PageTitle from '@/components/PageTitle';
import styles from './styles.scss';
import { formatMessage } from 'umi-plugin-react/locale';

const { TextArea } = Input;
const UpdateDevice = props => {
    const { dispatch, deviceStore, match } = props;
    const { detailDevice } = deviceStore;
    console.log('detailDevice', detailDevice);
    const [metadata, setMetadata] = useState();

    const { deviceId } = match.params;

    useEffect(() => {
        if (deviceId) {
            const payload = {
                deviceId: deviceId,
            };
            dispatch({ type: 'DEVICE/getDetailDevice', payload });
        }
    }, [deviceId, dispatch]);

    useEffect(() => {
        if (detailDevice) {
            setMetadata(detailDevice.metadata);
        }
    }, [detailDevice]);

    const handleSubmit = () => {
        if (!metadata) {
            message.error(formatMessage({ id: 'REQUIRE_VALUE' }));
        } else {
            const payload = {
                id: deviceId,
                metadata,
            };
            dispatch({ type: 'DEVICE/updateMetadata', payload });
        }
    };

    if (!detailDevice) {
        return <ModalLoading />;
    }

    return (
        <div className={styles.content}>
            <PageTitle
                linkBack={'/home/device-management'}
                title={formatMessage({ id: 'UPDATE_DEVICE_MANIPULATION' })}
            />
            <div className="mt-4">
                <TextArea
                    value={metadata}
                    onChange={e => setMetadata(e.target.value)}
                    rows={8}
                    className={styles.textInput}
                />
                <div className={styles.submit}>
                    <button onClick={handleSubmit} className={styles.primaryBtn}>
                        {formatMessage({ id: 'SUBMIT' })}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default connect(({ DEVICE, MASTERDATA }) => ({
    masterdataStore: MASTERDATA,
    deviceStore: DEVICE,
}))(withRouter(UpdateDevice));
