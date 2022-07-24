import ic_delete from '@/assets/image/ic_delete.svg';
import { DATE_FORMAT, ADMIN_KEY, PAGE_SIZE, Role } from '@/config/constant';
import { useLocalStorage } from '@/hooks';
import { formatVnd } from '@/util/function';
import { Modal, Pagination } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { useState } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import {
    DATE_FORMAT_TRANSACTION,
    PaymentTypeValue,
    TransactionStatusValue,
} from '@/config/constant';
import styles from './styles.scss';
import ModalLoading from '@/components/ModalLoading';
import EmptyComponent from '@/components/EmptyComponent';
const { confirm } = Modal;

function TableData({ dispatch, withdrawStore, pageIndex, setPageIndex }) {
    const { listWithdraw, totalRow, loading, listMerchant } = withdrawStore;
    console.log('listWithdraw', listWithdraw);
    const [admin] = useLocalStorage(ADMIN_KEY);
    const handleDelete = id => {
        confirm({
            title: formatMessage({ id: 'ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_TRANSACTION' }),
            onOk: () => {
                const payload = { id };
                dispatch({ type: 'DEPOSIT/deleteDeposit', payload });
            },
            onCancel: () => {},
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
                            {formatVnd(item.totalMoney)}
                        </td>
                        <td className="col-1">
                            {formatMessage({ id: TransactionStatusValue[item.transactionStatus] })}
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
