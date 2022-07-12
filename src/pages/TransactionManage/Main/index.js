import ic_accept from '@/assets/image/ic_check.png';
import ic_check from '@/assets/image/ic_check.svg';
import ic_denied from '@/assets/image/ic_denied.png';
import ic_eye from '@/assets/image/ic_eye.svg';
import ic_menu from '@/assets/image/ic_menu.svg';
import ic_search from '@/assets/image/ic_search.svg';
import ic_uncheck from '@/assets/image/ic_uncheck.svg';
import EmptyComponent from '@/components/EmptyComponent';
import Loading from '@/components/Loading';
import {
    DATE_FILTER,
    DATE_FORMAT,
    PAGE_SIZE,
    ROLE_ADMIN_COMPANY,
    ROLE_ADMIN_SYSTEM,
    ADMIN_KEY,
    TOKEN_KEY,
} from '@/config/constant';
import config from '@/config/index';
import { DatePicker, Input, message, Modal, Pagination, Select } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { router } from 'umi';
import styles from './styles.scss';
import { useSessionStorage } from '@/hooks';
import { formatVnd } from '@/util/function';

const { RangePicker } = DatePicker;
const { confirm } = Modal;
const { Option } = Select;
const statusTransaction = {
    0: 'Chờ xử lý',
    1: 'Đang xử lý',
    2: 'Hoàn thành',
    3: 'Đã từ chối',
    4: 'Khách hàng đã hủy',
};

const statusTransactionValue = {
    created: 0,
    processing: 1,
    completed: 2,
    deny: 3,
    cancel: 4,
};

const statusTransactionText = {
    0: 'created',
    1: 'processing',
    2: 'completed',
    3: 'deny',
    4: 'cancel',
};

const typeTransaction = {
    borrow: 0,
    repayment: 1,
};

function TransactionManage(props) {
    let { dispatch, transactionStore, masterDataStore } = props;
    let { transactions, totalRow, loading, checkResponse, updateResponse } = transactionStore;
    const { companyId } = masterDataStore;
    const [pageIndex, setPageIndex] = useState(1);
    const [status, setStatus] = useState();
    const [ownerName, setOwnerName] = useState();
    const [checked, setChecked] = useState();
    const [rangeTime, setRangeTime] = useState([]);
    const [admin] = useSessionStorage(ADMIN_KEY);

    const getTransactions = useCallback(
        payload => {
            dispatch({ type: 'TRANSACTION/getTransactions', payload });
        },
        [dispatch],
    );

    const updateTransaction = useCallback(
        payload => {
            dispatch({ type: 'TRANSACTION/updateTransaction', payload });
        },
        [dispatch],
    );

    useEffect(() => {
        if (companyId) {
            let payload = {
                page: pageIndex - 1,
                companyId,
                status,
                ownerName,
                checked,
                startDate: rangeTime?.[0],
                endDate: rangeTime?.[1],
            };
            getTransactions(payload);
        }
    }, [
        pageIndex,
        companyId,
        updateResponse,
        status,
        ownerName,
        checked,
        rangeTime,
        checkResponse,
    ]);

    function disabledDate(current) {
        // Can not select days after today and today
        return current && current > moment().endOf('day');
    }

    const getQueryString = queries => {
        return Object.keys(queries)
            .reduce((result, key) => {
                return [
                    ...result,
                    `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`,
                ];
            }, [])
            .join('&');
    };

    const confirmExport = () => {
        let timeExport = [];
        confirm({
            title: 'Chọn khoảng thời gian xuất báo cáo:',
            content: (
                <div className={styles.datePicker}>
                    <RangePicker
                        format={DATE_FILTER}
                        disabledDate={disabledDate}
                        onChange={(dates, dateStrings) => {
                            timeExport = dateStrings;
                        }}
                    />
                </div>
            ),
            onOk: () => handleExport(timeExport),
        });
    };

    const handleExport = timeExport => {
        if (!timeExport[0] && !timeExport[1]) {
            message.warn('Bạn chưa chọn khoảng thời gian giao dịch!');
            return;
        }
        const url = 'api/admin/v1/transaction/export';
        var params = getQueryString({
            companyId: companyId,
            startDate: timeExport[0],
            endDate: timeExport[1],
        });
        fetch(config.API_DOMAIN + url + '?' + params, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xlsx',
                Authorization: 'Bearer ' + sessionStorage.getItem(TOKEN_KEY),
            },
        })
            .then(response => response.blob())
            .then(blob => {
                // Create blob link to download
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `transaction.xlsx`);

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    };

    const handleUpdateChecked = (transactionCode, checked) => {
        if (admin.role === ROLE_ADMIN_SYSTEM) {
            return;
        }
        confirm({
            title: checked
                ? 'Bạn có chắc chắn muốn bỏ đối soát giao dịch này?'
                : 'Bạn có chắc chắn muốn đối soát giao dịch này?',
            onOk: () => {
                let payload = { code: transactionCode, checked: !checked };
                dispatch({
                    type: 'TRANSACTION/checkTransaction',
                    payload: payload,
                });
            },
            onCancel() {},
        });
    };

    const handleUpdateStatus = (code, status) => {
        if (admin.role === ROLE_ADMIN_COMPANY) {
            return;
        }
        // "reason": "Nếu status = deny thì mới cần truyền lý do",
        // "bankTransactionCode": "Nếu status = completed thì mới cần truyền"
        let title;
        let content;
        let reason;
        let bankTransactionCode;
        if (status === statusTransactionValue.processing) {
            title = 'Bạn có chắc muốn xác nhận giao dịch này?';
        } else if (status === statusTransactionValue.deny) {
            title = 'Bạn có chắc muốn từ chối giao dịch này?';
            content = (
                <Input
                    className={styles.textInput}
                    onChange={e => {
                        reason = e.target.value.trim();
                    }}
                    placeholder="Nhập lý do từ chối"
                />
            );
        } else if (status === statusTransactionValue.completed) {
            title = 'Bạn có chắc muốn hoàn tất giao dịch này?';
            content = (
                <Input
                    className={styles.textInput}
                    onChange={e => {
                        bankTransactionCode = e.target.value.trim();
                    }}
                    placeholder="Nhập mã giao dịch:"
                />
            );
        }
        confirm({
            title: title,
            content,
            onOk: () => {
                let payload = {
                    code,
                    status,
                };
                if (status === statusTransactionValue.completed) {
                    if (!bankTransactionCode) {
                        message.warn('Bạn chưa nhập mã giao dịch!');
                        return;
                    } else {
                        payload.bankTransactionCode = bankTransactionCode;
                    }
                } else if (status === statusTransactionValue.deny) {
                    if (!reason) {
                        message.warn('Bạn chưa nhập lý do từ chối giao dịch!');
                        return;
                    } else {
                        payload.reason = reason;
                    }
                }
                updateTransaction(payload);
            },
        });
    };

    const goToDetail = transactionCode => {
        router.push(`/admin/detail-transaction/${transactionCode}`);
    };

    const renderDataTransaction = loading ? (
        <Loading />
    ) : transactions.length === 0 ? (
        <EmptyComponent />
    ) : (
        transactions.map((value, index) => {
            const renderStatus = () => {
                if (value.status === statusTransactionValue.created) {
                    return (
                        <>
                            <div>{statusTransaction[value.status]}</div>
                            <img
                                onClick={() =>
                                    handleUpdateStatus(
                                        value.code,
                                        statusTransactionValue.processing,
                                    )
                                }
                                src={ic_uncheck}
                                alt="confirm"
                                className={styles.sizeIcon}
                            />
                        </>
                    );
                } else if (value.status === statusTransactionValue.processing) {
                    return (
                        <>
                            <div>{statusTransaction[value.status]}</div>
                            <img
                                onClick={() =>
                                    handleUpdateStatus(value.code, statusTransactionValue.deny)
                                }
                                src={ic_denied}
                                alt="denied"
                                className={styles.sizeIcon}
                                style={{ marginRight: 10 }}
                            />
                            <img
                                onClick={() =>
                                    handleUpdateStatus(value.code, statusTransactionValue.completed)
                                }
                                src={ic_accept}
                                alt="confirm"
                                className={styles.sizeIcon}
                            />
                        </>
                    );
                } else {
                    return <div>{statusTransaction[value.status]}</div>;
                }
            };
            return (
                <tr className="text-center" key={(value, index)}>
                    <td className="col-1">{value.name}</td>
                    <td className="col-2">{value.code}</td>
                    <td className="col-2">{moment(value.createdAt).format(DATE_FORMAT)}</td>
                    <td
                        className="col-2"
                        style={{
                            color: value.type === typeTransaction.borrow ? 'red' : 'green',
                        }}
                    >
                        {formatVnd(value.amount)}
                    </td>
                    <td className="col-2">{formatVnd(value.fee)}</td>
                    <td className="col-2">{renderStatus()}</td>
                    {/* <td className="col-1">
            {value.status === statusTransactionValue.completed ? (
              <img
                onClick={() => handleUpdateChecked(value.code, value.checked)}
                className={styles.sizeIcon}
                src={value.checked ? ic_check : ic_uncheck}
                alt="checked"
              />
            ) : null}
          </td> */}
                    <td className="col-1 d-flex justify-content-around">
                        <img
                            className={styles.sizeIcon}
                            src={ic_eye}
                            onClick={() => goToDetail(value.code)}
                            alt="detail"
                            title="Xem chi tiết"
                        />
                    </td>
                </tr>
            );
        })
    );

    return (
        <div className={styles.content}>
            <div className={styles.pageTitle}>Danh sách giao dịch</div>
            <div className={styles.pageFilter}>
                <div className={styles.select}>
                    <Select
                        style={{ minWidth: 180 }}
                        defaultValue=""
                        onChange={value => setStatus(value)}
                    >
                        <Option value="">
                            <img src={ic_menu} style={{ marginRight: 8 }} />
                            Trạng thái giao dịch
                        </Option>
                        <Option value={statusTransactionText[0]}>Chờ xử lý</Option>
                        <Option value={statusTransactionText[1]}>Đang xử lý</Option>
                        <Option value={statusTransactionText[2]}>Hoàn thành</Option>
                        <Option value={statusTransactionText[3]}>Từ chối</Option>
                        <Option value={statusTransactionText[4]}>Khách hàng hủy giao dịch</Option>
                    </Select>
                </div>
                <Input
                    prefix={<img src={ic_search} alt="ic_search" />}
                    className={styles.textInput}
                    placeholder="Tìm kiếm nhân viên"
                    onChange={e => setOwnerName(e.target.value)}
                />

                {/* <div className={styles.select}>
          <Select defaultValue={""} onChange={(value) => setChecked(value)}>
            <Option value={""}>Trạng thái đối soát</Option>
            <Option value={true}>{checkedTransaction[true]}</Option>
            <Option value={false}>{checkedTransaction[false]}</Option>
          </Select>
        </div> */}

                <div className={styles.datePicker}>
                    <RangePicker
                        format={DATE_FILTER}
                        disabledDate={disabledDate}
                        onChange={(dates, dateStrings) => setRangeTime(dateStrings)}
                    />
                </div>

                <button className={styles.primaryBtn} onClick={confirmExport}>
                    Xuất báo cáo
                </button>
            </div>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr className="text-center">
                            <th className="col-1">Tên</th>
                            <th className="col-2">Mã giao dịch</th>
                            <th className="col-2">Thời gian giao dịch</th>
                            <th className="col-2">Số tiền</th>
                            <th className="col-2">Phí</th>
                            <th className="col-2">Trạng thái</th>
                            {/* <th className="col-1">Đối soát</th> */}
                            <th className="col-1">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>{renderDataTransaction}</tbody>
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

export default connect(({ MASTERDATA, TRANSACTION }) => ({
    transactionStore: TRANSACTION,
    masterDataStore: MASTERDATA,
}))(TransactionManage);
