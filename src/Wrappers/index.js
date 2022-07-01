import React, { useEffect } from 'react';
import { connect } from 'dva';
import PageHeader from '@/components/PageHeader';
import { withRouter } from 'umi';
import styles from './styles.scss';
import { DEVICE_KEY } from '@/config/constant';
import { uuidv4 } from '@/util/function';
import { useLocalStorage } from '@/hooks';

function AppWrappers(props) {
    const [deviceKey, setDeviceKey] = useLocalStorage(DEVICE_KEY);
    useEffect(() => {
        if (!deviceKey) {
            setDeviceKey(uuidv4());
        }
    }, [deviceKey]);

    return (
        <div style={{ display: 'contents' }}>
            <PageHeader />
            <div className={styles.fullSpace}>{props.children}</div>
        </div>
    );
}

export default connect(({ MASTERDATA }) => ({
    masterDataStore: MASTERDATA,
}))(withRouter(AppWrappers));
