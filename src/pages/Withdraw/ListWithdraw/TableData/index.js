import ic_delete from '@/assets/image/ic_delete.svg';
import ic_check from '@/assets/image/ic_check.svg';
import ic_uncheck from '@/assets/image/ic_uncheck.svg';
import { DATE_FORMAT, ADMIN_KEY, PAGE_SIZE, Role } from '@/config/constant';
import { useLocalStorage } from '@/hooks';
import { formatVnd } from '@/util/function';
import { Modal, Pagination } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import {
    DATE_FORMAT_TRANSACTION,
    PaymentTypeValue,
    TransactionStatusValue,
    TransactionStatus,
} from '@/config/constant';
import styles from './styles.scss';
import ModalLoading from '@/components/ModalLoading';
import EmptyComponent from '@/components/EmptyComponent';
import ModalApprove from '../ModalApprove';
const { confirm } = Modal;

function TableData({ dispatch, withdrawStore, pageIndex, setPageIndex }) {
    const { listWithdraw, totalRow, loading, listMerchant, listDevices } = withdrawStore;
    console.log('listWithdraw', listWithdraw);
    const [currentTrans, setCurrentTrans] = useState({
        id: undefined,
        isShow: false,
    });
    const [admin] = useLocalStorage(ADMIN_KEY);

    const handleDelete = id => {
        confirm({
            title: formatMessage({ id: 'ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_TRANSACTION' }),
            onOk: () => {
                const payload = { id };
                dispatch({ type: 'WITHDRAW/deleteDeposit', payload });
            },
            onCancel: () => {},
        });
    };

    const handleDeny = id => {
        confirm({
            title: formatMessage({ id: 'ARE_YOU_SURE_YOU_WANT_TO_DENY_THIS_TRANSACTION' }),
            onOk: () => {
                const payload = { id };
                dispatch({ type: 'WITHDRAW/denyTransaction', payload });
            },
            onCancel: () => {},
        });
    };
    const handleApprove = id => {
        setCurrentTrans({
            id,
            isShow: true,
        });
    };
    const renderData =
        listWithdraw.length === 0 ? (
            <EmptyComponent />
        ) : (
            listWithdraw.map((item, index) => {
                return (
                    <tr className="text-center" key={index}>
                        <td className="col-2">
                            {listMerchant.find(i => i.id === item.ownerId)?.phone}
                            {' - '}
                            <span>{item.orderUsername}</span>
                        </td>
                        <td className="col-1">{item.code}</td>
                        <td className="col-2">
                            <span>{item.bankName}</span>
                            {' - '}
                            <span>{item.bankAccount}</span>
                        </td>
                        <td className={admin?.role === Role.ROLE_ADMIN ? 'col-1' : 'col-2'}>
                            {item.totalCurrentMoney > 0
                                ? formatVnd(item.totalCurrentMoney)
                                : formatVnd(item.totalMoney)}
                        </td>
                        <td className="col-1">
                            {item.transactionStatus === TransactionStatus.IN_PROGRESS_STAFF ? (
                                item.staffApproveId ? (
                                    formatMessage({
                                        id: 'PROCESSING',
                                    })
                                ) : (
                                    <>
                                        <div className="mb-2">
                                            {formatMessage({
                                                id: TransactionStatusValue[item.transactionStatus],
                                            })}
                                        </div>
                                        {(admin?.role === Role.ROLE_ADMIN ||
                                            admin?.role === Role.ROLE_ADMIN) && (
                                            <>
                                                <img
                                                    onClick={() => handleDeny(item.id)}
                                                    className={styles.sizeIcon}
                                                    src={ic_uncheck}
                                                    alt="unchecked"
                                                    style={{
                                                        marginRight: 5,
                                                        width: 17,
                                                        height: 17,
                                                    }}
                                                />
                                                <img
                                                    onClick={() => handleApprove(item.id)}
                                                    src={ic_check}
                                                    alt="checked"
                                                    style={{ width: 17, height: 17 }}
                                                />
                                            </>
                                        )}
                                    </>
                                )
                            ) : (
                                <div className="mb-2">
                                    {formatMessage({
                                        id: TransactionStatusValue[item.transactionStatus],
                                    })}
                                </div>
                            )}
                        </td>
                        <td className="col-2">
                            {moment(item.createdAt).format(DATE_FORMAT_TRANSACTION)}
                        </td>
                        <td className="col-2">
                            {moment(item.updatedAt).format(DATE_FORMAT_TRANSACTION)}
                        </td>
                        {admin?.role === Role.ROLE_ADMIN && (
                            <td className="col-1 d-flex justify-content-center">
                                <img
                                    className={styles.sizeIcon}
                                    src={ic_delete}
                                    onClick={() => handleDelete(item.id)}
                                    alt="delete"
                                />
                            </td>
                        )}
                    </tr>
                );
            })
        );

    if (loading) {
        return <ModalLoading />;
    }

    return (
        <div className={styles.table}>
            {currentTrans.isShow && (
                <ModalApprove currentTrans={currentTrans} setCurrentTrans={setCurrentTrans} />
            )}
            <table>
                <thead>
                    <tr className="text-center">
                        <th className="col-2">{formatMessage({ id: 'MERCHANT_USERNAME' })}</th>
                        <th className="col-1">{formatMessage({ id: 'ORDER_ID' })}</th>
                        <th className="col-2">{formatMessage({ id: 'RECIPIENT_ACC' })}</th>
                        <th className={admin?.role === Role.ROLE_ADMIN ? 'col-1' : 'col-2'}>
                            {formatMessage({ id: 'AMOUNT' })}
                        </th>
                        <th className="col-1">{formatMessage({ id: 'STATUS' })}</th>
                        <th className="col-2">{formatMessage({ id: 'CREATED_AT' })}</th>
                        <th className="col-2">{formatMessage({ id: 'HANDING_AT' })}</th>
                        {admin?.role === Role.ROLE_ADMIN && (
                            <th className="col-1">{formatMessage({ id: 'ACTION' })}</th>
                        )}
                    </tr>
                </thead>
                <tbody>{renderData}</tbody>
            </table>

            <div className={styles.pagination}>
                <Pagination
                    onChange={p => setPageIndex(p)}
                    defaultCurrent={pageIndex}
                    size="small"
                    total={totalRow}
                    pageSize={PAGE_SIZE}
                />
            </div>
        </div>
    );
}
export default connect(({ WITHDRAW }) => ({
    withdrawStore: WITHDRAW,
}))(TableData);
