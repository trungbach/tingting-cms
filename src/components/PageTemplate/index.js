import '@/base.scss';
import TopHeader from '@/components/TopHeader';
import { connect } from 'dva';
import React, { useEffect } from 'react';
import { withRouter } from 'umi';
import { setLocale } from 'umi-plugin-react/locale';
import styles from './styles.scss';

function PageTemplate(props) {
    const { content } = props;

    // useEffect(() => {
    //     setLocale('en-US');
    // }, []);
    return <div className={styles.contentPage}>{content}</div>;
}

export default connect(({ MASTERDATA }) => ({
    masterDataStore: MASTERDATA,
}))(withRouter(PageTemplate));
