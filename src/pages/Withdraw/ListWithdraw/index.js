import ic_export from '@/assets/image/ic_export.svg';
import {
    DATE_TRANSACTION,
    PaymentType,
    Role,
    RoleName,
    TOKEN_KEY,
    TransactionStatus,
    DATE_FORMAT_TRANSACTION,
} from '@/config/constant';
import config from '@/config/index';
import { DatePicker, Input, message, Select } from 'antd';
import { connect } from 'dva';
import cookies from 'js-cookie';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './styles.scss';
import TableData from './TableData';
import { useLocalStorage } from '@/hooks';
import { ADMIN_KEY } from '@/config/constant';

const { Option } = Select;
const { RangePicker } = DatePicker;

function ListWithdraw(props) {
    const { withdrawStore, dispatch } = props;
    const {
        listMerchant,
        deleteResponse,
        updateResponse,
        denyResponse,
        approveResponse,
        devices,
    } = withdrawStore;
    const [rangeTime, setRangeTime] = useState([]);
    const [transactionStatus, setTransactionStatus] = useState();
    const [paymentType, setPaymentType] = useState();
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const [deviceId, setDeviceId] = useState();
    const [orderCode, setOrderCode] = useState();

    const [pageIndex, setPageIndex] = useState(1);

    const [admin] = useLocalStorage(ADMIN_KEY);

    useEffect(() => {
        const payload = {
            page: 0,
        };
        dispatch({ type: 'WITHDRAW/getDevices', payload });
    }, [dispatch]);

    useEffect(() => {
        const payload = {
            page: 0,
            role: RoleName[Role.ROLE_USER],
        };
        dispatch({ type: 'WITHDRAW/getMerchants', payload });
    }, [dispatch]);

    useEffect(() => {
        let payload = {
            page: pageIndex - 1,
            transactionType: 'withdraw_money',
            transactionStatus,
            userId,
            paymentType,
            orderCode,
            startDate: rangeTime?.[0],
            endDate: rangeTime?.[1],
            deviceId,
        };
        if (admin?.role === Role.ROLE_AGENT) {
            payload.agentId = admin.id;
        }
        dispatch({ type: 'WITHDRAW/getWithdraws', payload });

        const interval = setInterval(
            () => dispatch({ type: 'WITHDRAW/getWithdraws', payload }),
            5000,
        );
        return () => {
            clearInterval(interval);
        };
    }, [
        pageIndex,
        username,
        deleteResponse,
        transactionStatus,
        orderCode,
        paymentType,
        updateResponse,
        rangeTime,
        dispatch,
        denyResponse,
        approveResponse,
        admin,
        userId,
        deviceId,
    ]);

    function disabledDate(current) {
        // Can not select days after today and today
        return current && current > moment().endOf('day');
    }

    const getQueryString = queries => {
        return Object.keys(queries)
            .filter(i => queries[i] !== undefined)
            .reduce((result, key) => {
                return [...result, `${encodeURIComponent(key)}=${queries[key]}`];
            }, [])
            .join('&');
    };

    const handleExport = () => {
        if (!rangeTime[0] && !rangeTime[1]) {
            message.warn(formatMessage({ id: 'PLEASE_SET_TIME_EXPORT' }));
            return;
        }
        const url = 'api/v1/transaction/export';
        console.log('rangeTime', rangeTime);
        var params = getQueryString({
            page: pageIndex - 1,
            transactionType: 'withdraw_money',
            transactionStatus,
            username,
            paymentType,
            orderCode,
            startDate: rangeTime[0],
            endDate: rangeTime[1],
        });
        fetch(config.API_DOMAIN + url + '?' + params, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xlsx',
                Authorization: 'Bearer ' + localStorage.getItem(TOKEN_KEY),
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

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <div>
                    <h3>{formatMessage({ id: 'WITHDRAW_LIST' })}</h3>
                </div>
                <div className={styles.datePicker}>
                    <label className="me-2">{formatMessage({ id: 'TIME' })}: </label>
                    <RangePicker
                        format={DATE_TRANSACTION}
                        disabledDate={disabledDate}
                        onChange={(dates, dateStrings) => setRangeTime(dateStrings)}
                    />
                </div>
            </div>
            <div className={styles.pageFilter}>
                <div className={styles.select}>
                    <div className="mb-1">{formatMessage({ id: 'MERCHANT' })}:</div>
                    <Select
                        style={{ minWidth: 180 }}
                        defaultValue=""
                        onChange={value => setUserId(value)}
                    >
                        <Option value={''}>{formatMessage({ id: 'ALL' })}</Option>
                        {listMerchant.map(item => {
                            return <Option value={item.id}>{item.phone}</Option>;
                        })}
                    </Select>
                </div>

                {/* <div className={styles.select}>
                    <div className="mb-1">{formatMessage({ id: 'CHANNEL' })}:</div>
                    <Select
                        style={{ minWidth: 180 }}
                        defaultValue=""
                        onChange={value => setPaymentType(value)}
                    >
                        <Option value="">{formatMessage({ id: 'ALL' })}</Option>
                        {Object.keys(PaymentType).map((item, index) => {
                            return <Option value={item}>{formatMessage({ id: `${item}` })}</Option>;
                        })}
                    </Select>
                </div> */}

                <div className={styles.select}>
                    <div className="mb-1">{formatMessage({ id: 'STATUS' })}:</div>
                    <Select
                        style={{ minWidth: 180 }}
                        defaultValue=""
                        onChange={value => setTransactionStatus(value)}
                    >
                        <Option value="">{formatMessage({ id: 'ALL' })}</Option>
                        {Object.keys(TransactionStatus).map((item, index) => {
                            return <Option value={item}>{formatMessage({ id: `${item}` })}</Option>;
                        })}
                    </Select>
                </div>
                {/* <div className={styles.select}>
                    <div className="mb-1">{formatMessage({ id: 'USERNAME' })}:</div>
                    <Input
                        className={styles.textInput}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div> */}

                <div className={styles.select}>
                    <div className="mb-1">{formatMessage({ id: 'DEVICE' })}:</div>
                    <Select
                        style={{ minWidth: 180 }}
                        defaultValue=""
                        onChange={value => setDeviceId(value)}
                    >
                        <Option value={''}>{formatMessage({ id: 'ALL' })}</Option>
                        {devices.map(item => {
                            return <Option value={item.id}>{item.bankName}</Option>;
                        })}
                    </Select>
                </div>

                <div className={styles.select}>
                    <div className="mb-1">{formatMessage({ id: 'MERCHANT_ORDER_ID' })}</div>
                    <Input
                        className={styles.textInput}
                        onChange={e => setOrderCode(e.target.value)}
                    />
                </div>

                <button className={styles.yellowBtn} onClick={handleExport}>
                    <img width={20} style={{ marginRight: 6 }} src={ic_export} alt="" />
                    {formatMessage({ id: 'EXPORT' })}
                </button>
            </div>
            <TableData pageIndex={pageIndex} setPageIndex={setPageIndex} />
        </div>
    );
}

export default connect(({ WITHDRAW }) => ({
    withdrawStore: WITHDRAW,
}))(withRouter(ListWithdraw));
