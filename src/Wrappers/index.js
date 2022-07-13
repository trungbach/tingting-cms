import React, { useEffect } from 'react';
import { connect } from 'dva';
import PageHeader from '@/components/PageHeader';
import UserInfo from '@/components/UserInfo';
import { withRouter } from 'umi';
import styles from './styles.scss';
import { DEVICE_KEY } from '@/config/constant';
import { uuidv4 } from '@/util/function';
import { useLocalStorage } from '@/hooks';
import { setLocale, getLocale } from 'umi-plugin-react/locale';

function AppWrappers(props) {
    useEffect(() => {
        const locale = localStorage.getItem('umi_locale');
        if (locale) {
            setLocale(locale);
        } else {
            setLocale('en-US');
        }
    }, []);

    console.log('locale', getLocale());

    return (
        <div style={{ display: 'contents' }}>
            <PageHeader />
            <UserInfo />
            <div className={styles.fullSpace}>{props.children}</div>
        </div>
    );
}

export default connect(({ MASTERDATA }) => ({
    masterDataStore: MASTERDATA,
}))(withRouter(AppWrappers));
