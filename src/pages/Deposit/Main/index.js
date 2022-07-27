import React from 'react';
import { router, withRouter } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';
import ListDeposit from '../ListDeposit';
import TopUp from '../TopUp';
import styles from './styles.scss';
import { useLocalStorage } from '@/hooks/index';
import { ADMIN_KEY, Role } from '@/config/constant';

function Deposit(props) {
    const { location } = props;

    const renderComponent = () => {
        if (location.query.tab === 'topup') {
            return <TopUp />;
        } else if (location.query.tab === 'list-deposit' || location.query.tab === undefined) {
            return <ListDeposit />;
        }
    };

    const [admin] = useLocalStorage(ADMIN_KEY);

    return (
        <>
            {admin?.role === Role.ROLE_USER && (
                <div className={styles.tabs}>
                    <button
                        className={
                            location.query.tab === 'list-deposit' ||
                            location.query.tab === undefined
                                ? `${styles.active}`
                                : undefined
                        }
                        onClick={() => router.push('/home/deposit?tab=list-deposit')}
                    >
                        {formatMessage({ id: 'DEPOSIT_LIST' })}
                    </button>
                    {admin?.role === Role.ROLE_USER && (
                        <button
                            className={
                                location.query.tab === 'topup' ? `${styles.active}` : undefined
                            }
                            onClick={() => router.push('/home/deposit?tab=topup')}
                        >
                            {formatMessage({ id: 'TOPUP' })}
                        </button>
                    )}
                </div>
            )}
            {renderComponent()}
        </>
    );
}

export default withRouter(Deposit);
