import React, { useState } from 'react';
import styles from './styles.scss';
import { Pagination } from 'antd';
import { PAGE_SIZE } from '@/config/constant';
import { formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import { router } from 'umi';
import { formatVnd } from '@/util/function';
import { DATE_FORMAT } from '@/config/constant';
import ic_eye from '@/assets/image/ic_eye.svg';
import ic_edit from '@/assets/image/ic_edit.svg';
import ic_delete from '@/assets/image/ic_delete.svg';

const totalRow = 64;
const statusTransaction = {
    0: 'Chờ xử lý',
    1: 'Đang xử lý',
    2: 'Hoàn thành',
    3: 'Đã từ chối',
    4: 'Khách hàng đã hủy',
};

export default function TableData({ listData }) {
    const [pageIndex, setPageIndex] = useState(1);
    const goToDetail = transactionCode => {
        router.push(`/admin/detail-transaction/${transactionCode}`);
    };
    const renderData = listData.map((item, index) => {
        return (
            <tr className="text-center" key={index}>
                <td className="col-1">{item.customer}</td>
                <td className="col-1">{item.orderId}</td>
                <td className="col-2">{item.channel}</td>
                <td className="col-1">{moment(item.createdAt).format(DATE_FORMAT)}</td>
                <td className="col-1">{formatVnd(item.amount)}</td>
                <td className="col-2">{item.status}</td>
                <td className="col-1">{item.userId}</td>
                <td className="col-1">{item.balance}</td>
                {/* <td
                className="col-2"
                style={{
                    color: item.type === typeTransaction.borrow ? 'red' : 'green',
                }}
            >
                {formatVnd(item.amount)}
            </td> */}
                <td className="col-2 d-flex justify-content-center">
                    <img
                        style={{ marginRight: 8 }}
                        className={styles.sizeIcon}
                        src={ic_eye}
                        onClick={() => goToDetail(item.id)}
                        alt="detail"
                    />

                    <img
                        className={styles.sizeIcon}
                        src={ic_delete}
                        onClick={() => goToDetail(item.id)}
                        alt="delete"
                    />
                </td>
            </tr>
        );
    });

    return (
        <div className={styles.table}>
            <table>
                <thead>
                    <tr className="text-center">
                        <th className="col-1">{formatMessage({ id: 'CUSTOMER' })}</th>
                        <th className="col-1">{formatMessage({ id: 'ORDER_ID' })}</th>
                        <th className="col-2">{formatMessage({ id: 'CHANNEL' })}</th>
                        <th className="col-1">{formatMessage({ id: 'TIME' })}</th>
                        <th className="col-1">{formatMessage({ id: 'AMOUNT' })}</th>
                        <th className="col-2">{formatMessage({ id: 'STATUS' })}</th>
                        <th className="col-1">{formatMessage({ id: 'MERCHANT_USER_ID' })}</th>
                        <th className="col-1">{formatMessage({ id: 'BALANCE' })}</th>
                        <th className="col-2">{formatMessage({ id: 'ACTION' })}</th>
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
