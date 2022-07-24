import { connect } from 'dva';
import React from 'react';
import { router, withRouter } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';
import ListWithdraw from '../ListWithdraw';
import Settlement from '../Settlement';
import AddWithdraw from '../AddWithdraw';
import styles from './styles.scss';

function Withdraw(props) {
    const { location } = props;

    const renderComponent = () => {
        if (location.query.tab === 'add-withdraw') {
            return <AddWithdraw />;
        } else if (location.query.tab === 'list-withdraw' || location.query.tab === undefined) {
            return <ListWithdraw />;
        } else if (location.query.tab === 'settlement') {
            return <Settlement />;
        }
    };

    return (
        <>
            <div className={styles.tabs}>
                <button
                    className={
                        location.query.tab === 'list-withdraw' || location.query.tab === undefined
                            ? `${styles.active}`
                            : undefined
                    }
                    onClick={() => router.push('/home/withdraw?tab=list-withdraw')}
                >
                    {formatMessage({ id: 'WITHDRAW_LIST' })}
                </button>
                <button
                    className={
                        location.query.tab === 'add-withdraw' ? `${styles.active}` : undefined
                    }
                    onClick={() => router.push('/home/withdraw?tab=add-withdraw')}
                >
                    {formatMessage({ id: 'ADD_WITHDRAW_REQUEST' })}
                </button>

                {/* <button
                    className={location.query.tab === 'settlement' ? `${styles.active}` : undefined}
                    onClick={() => router.push('/home/withdraw?tab=settlement')}
                >
                    {formatMessage({ id: 'SETTLEMENT_APPLICATION' })}
                </button> */}
            </div>
            <div className={styles.content}>{renderComponent()}</div>
        </>
    );
}

export default connect(({ DASHBOARD }) => ({
    dashboardStore: DASHBOARD,
}))(withRouter(Withdraw));
