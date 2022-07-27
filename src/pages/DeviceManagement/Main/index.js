import EmptyComponent from '@/components/EmptyComponent';
import Loading from '@/components/Loading';
import { ADMIN_KEY, DATE_FILTER, DeviceStatus, PAGE_SIZE } from '@/config/constant';
import { useLocalStorage } from '@/hooks';
import { DatePicker, Input, Modal, Pagination, Select } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { router, withRouter } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';
import { DeviceStatusValue, Role } from '../../../config/constant';
import { formatVnd } from '../../../util/function';
import ModalUpdateStatus from '../ModalUpdateStatus';
import styles from './styles.scss';
import ic_edit from '@/assets/image/ic_edit.svg';
import ic_delete from '@/assets/image/ic_delete.svg';

import ModalUpdateDailyWithdraw from '../ModalUpdateDailyWithdraw';
const { RangePicker } = DatePicker;

const { confirm } = Modal;
const { Option } = Select;

function DeviceManagement(props) {
    let { dispatch, deviceStore } = props;
    let { devices, totalRow, loading, updateSuccess, deleteSuccess, listPaymentType } = deviceStore;
    const [admin] = useLocalStorage(ADMIN_KEY);
    const [pageIndex, setPageIndex] = useState(1);
    const [paymentTypeId, setPaymentTypeId] = useState();
    const [username, setUsername] = useState();
    const [accountNumber, setAccountNumber] = useState();
    // const [rangeTime, setRangeTime] = useState([]);
    const [status, setStatus] = useState();
    const [currentUpdate, setCurrentUpdate] = useState({
        showStatus: false,
        id: undefined,
        status: undefined,
    });
    const [currentWithdraw, setCurrentWithdraw] = useState({
        showWithdraw: false,
        id: undefined,
        dailyWithdrawMoney: undefined,
    });

    useEffect(() => {
        dispatch({ type: 'DEVICE/getPaymentType' });
    }, [dispatch]);

    useEffect(() => {
        let payload = {
            page: pageIndex - 1,
            accountNumber,
            status,
            username,
            paymentTypeId,
        };
        dispatch({ type: 'DEVICE/getDevices', payload });
    }, [
        pageIndex,
        accountNumber,
        username,
        status,
        paymentTypeId,
        dispatch,
        updateSuccess,
        deleteSuccess,
    ]);

    const handleDelete = deviceId => {
        confirm({
            title: formatMessage({ id: 'ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_DEVICE' }),
            onOk: () => {
                const payload = { id: deviceId };
                dispatch({ type: 'DEVICE/deleteDevice', payload });
            },
            onCancel: () => {},
        });
    };

    const goToEdit = id => {
        router.push(`/home/update-device/${id}`);
    };

    const renderDataUsers = loading ? (
        <Loading />
    ) : devices.length === 0 ? (
        <EmptyComponent />
    ) : (
        devices.map((value, index) => (
            <tr className="row text-center" key={(value, index)}>
                {/* <td className="col-2">{value.deviceName}</td> */}
                <td className="col-2">{value.username}</td>
                <td className="col-2">
                    [{value.bankName}]{value.numberAccount}
                </td>
                <td className={`col-1 ${styles.moneyColor}`}>{formatVnd(value.totalMoney)}</td>
                <td className={`col-2 ${styles.moneyColor}`}>
                    <div>+{formatVnd(value.dailySendMoney)}</div>
                    <div>-{formatVnd(value.withdrawMoney)}</div>
                </td>
                <td className={`col-2 ${styles.moneyColor}`}>
                    <div>+{formatVnd(value.allSendMoney)}</div>
                    <div>-{formatVnd(value.allWithdrawMoney)}</div>
                </td>
                <td className="col-1">
                    {formatVnd(value.dailyWithdrawMoney)}
                    {admin?.role === Role.ROLE_ADMIN && (
                        <span
                            onClick={() =>
                                setCurrentWithdraw({
                                    showWithdraw: true,
                                    id: value.id,
                                    dailyWithdrawMoney: value.dailyWithdrawMoney,
                                })
                            }
                            style={{ marginLeft: 5, cursor: 'pointer' }}
                        >
                            <img className={styles.iconSize} src={ic_edit} alt="" />
                        </span>
                    )}
                </td>
                <td
                    className="col-1"
                    onClick={() =>
                        setCurrentUpdate({
                            showStatus: true,
                            id: value.id,
                            status: value.status,
                        })
                    }
                >
                    <span
                        className={
                            value.status === DeviceStatusValue.off
                                ? styles.lockedStatus
                                : value.status === DeviceStatusValue.on
                                ? styles.activeStatus
                                : styles.pauseStatus
                        }
                    >
                        {formatMessage({ id: DeviceStatus[value.status] })}
                    </span>
                </td>
                <td className="col-1">
                    <img
                        style={{ marginRight: 7 }}
                        onClick={() => goToEdit(value.id)}
                        className={styles.iconSize}
                        src={ic_edit}
                        alt=""
                    />
                    <img
                        className={styles.sizeIcon}
                        src={ic_delete}
                        onClick={() => handleDelete(value.id)}
                        alt="Delete"
                    />
                </td>
            </tr>
        ))
    );
    function disabledDate(current) {
        // Can not select days after today and today
        return current && current > moment().endOf('day');
    }

    const goToCreate = () => {
        router.push('/home/create-card');
    };

    const key = 'sortNameBank';
    const arrayUniqueByBankName = [
        ...new Map(listPaymentType.map(item => [item[key], item])).values(),
    ];

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <div>
                    <h3>{formatMessage({ id: 'DEVICE_MANAGEMENT' })}</h3>
                </div>
                {/* <div className={styles.datePicker}>
                    <label className="me-2">{formatMessage({ id: 'TIME' })}: </label>
                    <RangePicker
                        format={DATE_FILTER}
                        disabledDate={disabledDate}
                        onChange={(dates, dateStrings) => setRangeTime(dateStrings)}
                    />
                </div> */}
                <div style={{ height: 40 }}>
                    <button className={styles.primaryBtn} onClick={goToCreate}>
                        {formatMessage({ id: 'ADD_CARD' })}
                    </button>
                </div>
            </div>
            <div className={styles.pageFilter}>
                <div className={styles.select}>
                    <div className="mb-1"> {formatMessage({ id: 'STATUS' })}:</div>
                    <Select
                        style={{ minWidth: 180 }}
                        defaultValue=""
                        onChange={value => setStatus(value)}
                    >
                        <Option value="">{formatMessage({ id: 'ALL' })}</Option>

                        {Object.keys(DeviceStatusValue).map((item, index) => {
                            return <Option value={item}>{formatMessage({ id: `${item}` })}</Option>;
                        })}
                    </Select>
                </div>

                <div style={{ height: 40 }}>
                    <div className="mb-1">{formatMessage({ id: 'ACCOUNT_HOLDER' })}:</div>
                    <Input
                        onChange={e => setUsername(e.target.value)}
                        className={styles.textInput}
                    />
                </div>
                <div style={{ height: 40 }}>
                    <div className="mb-1">{formatMessage({ id: 'ACCOUNT_NUMBER' })}:</div>
                    <Input
                        onChange={e => setAccountNumber(e.target.value)}
                        className={styles.textInput}
                    />
                </div>
                <div style={{ height: 40 }}>
                    <div className="mb-1">{formatMessage({ id: 'BANK_NAME' })}:</div>
                    <Select style={{ minWidth: 180 }} onChange={value => setPaymentTypeId(value)}>
                        {arrayUniqueByBankName.map((item, index) => {
                            return <Option value={item.id}>{item.sortNameBank}</Option>;
                        })}
                    </Select>
                </div>
            </div>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr className="text-center">
                            {/* <th className="col-2"> {formatMessage({ id: 'DEVICE_NAME' })}</th> */}
                            <th className="col-2"> {formatMessage({ id: 'ACCOUNT_HOLDER' })}</th>
                            <th className="col-2">{formatMessage({ id: 'ACCOUNT_NUMBER' })}</th>
                            <th className="col-1">{formatMessage({ id: 'BALANCE' })}</th>
                            <th className="col-2">{formatMessage({ id: 'CUMULATIVE_TODAY' })}</th>
                            <th className="col-2">{formatMessage({ id: 'ALL_CUMULATIVE' })}</th>
                            <th className="col-1">
                                {formatMessage({ id: 'WITHDRAWAL_DAILY_LIMIT' })}
                            </th>
                            <th className="col-1">{formatMessage({ id: 'STATUS' })}</th>
                            <th className="col-1">{formatMessage({ id: 'ACTION' })}</th>
                        </tr>
                    </thead>
                    <tbody>{renderDataUsers}</tbody>
                </table>

                <div className={styles.pagination}>
                    <Pagination
                        onChange={page => setPageIndex(page)}
                        defaultCurrent={pageIndex}
                        size="small"
                        total={totalRow}
                        PAGE_SIZE={PAGE_SIZE}
                    />
                </div>
            </div>
            <ModalUpdateStatus currentUpdate={currentUpdate} setCurrentUpdate={setCurrentUpdate} />
            {currentWithdraw.showWithdraw && (
                <ModalUpdateDailyWithdraw
                    currentWithdraw={currentWithdraw}
                    setCurrentWithdraw={setCurrentWithdraw}
                />
            )}
        </div>
    );
}

export default connect(({ DEVICE }) => ({
    deviceStore: DEVICE,
}))(withRouter(DeviceManagement));
