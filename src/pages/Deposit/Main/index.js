import { connect } from 'dva';
import React from 'react';
import { router, withRouter } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';
import ListWithdraw from '../ListWithdraw';
import TopUp from '../TopUp';
import styles from './styles.scss';

function Deposit(props) {
    const { dashboardStore, location } = props;
    const { dashboardData } = dashboardStore;

    const renderComponent = () => {
        if (location.query.tab === 'topup') {
            return <TopUp />;
        } else if (location.query.tab === 'list-deposit' || location.query.tab === undefined) {
            return <ListWithdraw />;
        }
    };

    return (
        <>
            <div className={styles.tabs}>
                <button
                    className={
                        location.query.tab === 'list-deposit' || location.query.tab === undefined
                            ? `${styles.active}`
                            : undefined
                    }
                    onClick={() => router.push('/home/deposit?tab=list-deposit')}
                >
                    {formatMessage({ id: 'DEPOSIT_LIST' })}
                </button>
                <button
                    className={location.query.tab === 'topup' ? `${styles.active}` : undefined}
                    onClick={() => router.push('/home/deposit?tab=topup')}
                >
                    {formatMessage({ id: 'TOPUP' })}
                </button>
            </div>
            <div className={styles.content}>{renderComponent()}</div>
        </>
    );
}

export default connect(({ DASHBOARD }) => ({
    dashboardStore: DASHBOARD,
}))(withRouter(Deposit));
