import EmptyComponent from '@/components/EmptyComponent';
import Loading from '@/components/Loading';
import { PAGE_SIZE } from '@/config/constant';
import { formatVnd } from '@/util/function';
import { Pagination, Modal, message, Input } from 'antd';
import { connect } from 'dva';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles.scss';
const { confirm } = Modal;
function BorrowManage(props) {
    let { dispatch, borrowStore, masterDataStore } = props;
    let { borrowData, totalRow, loading, repayResponse } = borrowStore;
    const { companyCode } = masterDataStore;
    const [pageIndex, setPageIndex] = useState(1);

    const getUserBorrow = useCallback(
        payload => {
            dispatch({ type: 'BORROW/getUserBorrow', payload });
        },
        [dispatch],
    );

    const staffRepayment = useCallback(
        payload => {
            dispatch({ type: 'BORROW/staffRepayment', payload });
        },
        [dispatch],
    );

    useEffect(() => {
        if (companyCode) {
            let payload = {
                page: pageIndex - 1,
                companyCode,
            };
            getUserBorrow(payload);
        }
    }, [pageIndex, companyCode, repayResponse]);

    const handleRepayment = userCode => {
        let amount;
        confirm({
            title: 'Bạn có muốn xác nhận trả nợ?',
            content: (
                <Input
                    onChange={e => {
                        amount = e.target.value;
                    }}
                    type="number"
                    prefix="₫"
                    className={styles.textInputLight}
                />
            ),
            onOk: () => {
                if (!amount) {
                    message.warn('Bạn chưa nhập số tiền!');
                    return;
                } else if (amount < 0) {
                    message.warn('Số tiền thanh toán phải lớn hơn 0!');
                    return;
                } else {
                    staffRepayment({ code: userCode, amount: amount });
                }
            },
            onCancel: () => {},
        });
    };

    const renderDataBorrow = loading ? (
        <Loading />
    ) : borrowData.length === 0 ? (
        <EmptyComponent />
    ) : (
        borrowData.map((value, index) => {
            return (
                <tr className="text-center" key={(value, index)}>
                    <td className="col-1">{value.code}</td>
                    <td className="col-2">{value.name}</td>
                    <td className="col-2">{value.phone}</td>
                    <td className="col-3">{value.email}</td>
                    <td className="col-2">{value.positionInCompany}</td>
                    <td className="col-2">{formatVnd(value.borrowed)}</td>
                    {/* <td className="col-1">
            <span
              className={styles.repayment}
              onClick={() => handleRepayment(value.code)}
            >
              Trả nợ
            </span>
          </td> */}
                </tr>
            );
        })
    );

    return (
        <div className={styles.content}>
            <div className={styles.pageTitle}>Quản lý dư nợ nhân viên</div>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr className="text-center">
                            <th className="col-1">Mã</th>
                            <th className="col-2">Tên</th>
                            <th className="col-2">Điện thoại</th>
                            <th className="col-3">Email</th>
                            <th className="col-2">Chức vụ</th>
                            <th className="col-2">Khoản vay</th>
                            {/* <th className="col-1">Hành động</th> */}
                        </tr>
                    </thead>
                    <tbody>{renderDataBorrow}</tbody>
                </table>

                <div className={styles.pagination}>
                    <Pagination
                        onChange={p => setPageIndex(p)}
                        defaultCurrent={pageIndex}
                        size="small"
                        total={totalRow}
                        PAGE_SIZE={PAGE_SIZE}
                    />
                </div>
            </div>
        </div>
    );
}

export default connect(({ MASTERDATA, BORROW }) => ({
    borrowStore: BORROW,
    masterDataStore: MASTERDATA,
}))(BorrowManage);
