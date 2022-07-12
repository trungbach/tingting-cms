import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import styles from './styles.scss';
import { formatVnd } from '@/util/function';
import { formatMessage } from 'umi-plugin-react/locale';
import { DatePicker, message, Select, Input } from 'antd';
import { DATE_FILTER } from '@/config/constant';
import moment from 'moment';
import TableData from './TableData';
import { TOKEN_KEY } from '@/config/constant';
import cookies from 'js-cookie';
import config from '@/config/index';
import ic_export from '@/assets/image/ic_export.svg';
import { router, withRouter } from 'umi';
const { Option } = Select;
const { RangePicker } = DatePicker;

function ListWithdraw(props) {
    const { dashboardStore, dispatch, location } = props;
    const { dashboardData } = dashboardStore;
    const [rangeTime, setRangeTime] = useState([]);
    const [status, setStatus] = useState();
    const [channel, setChannel] = useState();
    const [customer, setCustomer] = useState();
    const [merchantUser, setMerchantUser] = useState();
    const [orderId, setOrderId] = useState();

    console.log('router', location.query.tab);

    function disabledDate(current) {
        // Can not select days after today and today
        return current && current > moment().endOf('day');
    }

    const listData = [
        {
            customer: 'Customer',
            orderId: 111,
            channel: 'MoMo QR',
            createdAt: '2020-12-03',
            amount: 1000,
            status: 'PENDING',
            userId: '123',
            balance: 2000,
        },
        {
            customer: 'Customer',
            orderId: 111,
            channel: 'MoMo QR',
            createdAt: '2020-12-03',
            amount: 1000,
            status: 'PENDING',
            userId: '123',
            balance: 2000,
        },
        {
            customer: 'Customer',
            orderId: 111,
            channel: 'MoMo QR',
            createdAt: '2020-12-03',
            amount: 1000,
            status: 'PENDING',
            userId: '123',
            balance: 2000,
        },
        {
            customer: 'Customer',
            orderId: 111,
            channel: 'MoMo QR',
            createdAt: '2020-12-03',
            amount: 1000,
            status: 'PENDING',
            userId: '123',
            balance: 2000,
        },
        {
            customer: 'Customer',
            orderId: 111,
            channel: 'MoMo QR',
            createdAt: '2020-12-03',
            amount: 1000,
            status: 'PENDING',
            userId: '123',
            balance: 2000,
        },
        {
            customer: 'Customer',
            orderId: 111,
            channel: 'MoMo QR',
            createdAt: '2020-12-03',
            amount: 1000,
            status: 'PENDING',
            userId: '123',
            balance: 2000,
        },
        {
            customer: 'Customer',
            orderId: 111,
            channel: 'MoMo QR',
            createdAt: '2020-12-03',
            amount: 1000,
            status: 'PENDING',
            userId: '123',
            balance: 2000,
        },
        {
            customer: 'Customer',
            orderId: 111,
            channel: 'MoMo QR',
            createdAt: '2020-12-03',
            amount: 1000,
            status: 'PENDING',
            userId: '123',
            balance: 2000,
        },
        {
            customer: 'Customer',
            orderId: 111,
            channel: 'MoMo QR',
            createdAt: '2020-12-03',
            amount: 1000,
            status: 'PENDING',
            userId: '123',
            balance: 2000,
        },
        {
            customer: 'Customer',
            orderId: 111,
            channel: 'MoMo QR',
            createdAt: '2020-12-03',
            amount: 1000,
            status: 'PENDING',
            userId: '123',
            balance: 2000,
        },
        {
            customer: 'Customer',
            orderId: 111,
            channel: 'MoMo QR',
            createdAt: '2020-12-03',
            amount: 1000,
            status: 'PENDING',
            userId: '123',
            balance: 2000,
        },
        {
            customer: 'Customer',
            orderId: 111,
            channel: 'MoMo QR',
            createdAt: '2020-12-03',
            amount: 1000,
            status: 'PENDING',
            userId: '123',
            balance: 2000,
        },
    ];

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

    const handleExport = () => {
        if (!rangeTime[0] && !rangeTime[1]) {
            message.warn(formatMessage({ id: 'PLEASE_SET_TIME_EXPORT' }));
            return;
        }
        const url = 'api/admin/v1/transaction/export';
        var params = getQueryString({
            // companyId: companyId,
            startDate: rangeTime[0],
            endDate: rangeTime[1],
        });
        fetch(config.API_DOMAIN + url + '?' + params, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/xlsx',
                Authorization: 'Bearer ' + cookies.get(TOKEN_KEY),
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
                    <h3>{formatMessage({ id: 'ALL_TRANSACTIONS' })}</h3>
                </div>
                <div className={styles.datePicker}>
                    <label className="me-2">{formatMessage({ id: 'TIME' })}: </label>
                    <RangePicker
                        format={DATE_FILTER}
                        disabledDate={disabledDate}
                        onChange={(dates, dateStrings) => setRangeTime(dateStrings)}
                    />
                </div>
            </div>
            <div className={styles.pageFilter}>
                <div className={styles.select}>
                    <div className="mb-1">{formatMessage({ id: 'CUSTOMER' })}:</div>
                    <Select
                        style={{ minWidth: 180 }}
                        defaultValue=""
                        onChange={value => setCustomer(value)}
                    >
                        <Option value="">{formatMessage({ id: 'CUSTOMER' })}</Option>
                        <Option value="23">Chờ xử lý</Option>
                        <Option value="234">Đang xử lý</Option>
                        <Option value="235">Hoàn thành</Option>
                        <Option value="236">Từ chối</Option>
                        <Option value="237">Khách hàng hủy giao dịch</Option>
                    </Select>
                </div>

                <div className={styles.select}>
                    <div className="mb-1">{formatMessage({ id: 'CHANNEL' })}:</div>
                    <Select
                        style={{ minWidth: 180 }}
                        defaultValue=""
                        onChange={value => setChannel(value)}
                    >
                        <Option value="">{formatMessage({ id: 'CHANNEL' })}</Option>
                        <Option value="23">Chờ xử lý</Option>
                        <Option value="234">Đang xử lý</Option>
                        <Option value="235">Hoàn thành</Option>
                        <Option value="236">Từ chối</Option>
                        <Option value="237">Khách hàng hủy giao dịch</Option>
                    </Select>
                </div>

                <div className={styles.select}>
                    <div className="mb-1">{formatMessage({ id: 'STATUS' })}:</div>
                    <Select
                        style={{ minWidth: 180 }}
                        defaultValue=""
                        onChange={value => setStatus(value)}
                    >
                        <Option value="">{formatMessage({ id: 'STATUS' })}</Option>
                        <Option value="23">Chờ xử lý</Option>
                        <Option value="234">Đang xử lý</Option>
                        <Option value="235">Hoàn thành</Option>
                        <Option value="236">Từ chối</Option>
                        <Option value="237">Khách hàng hủy giao dịch</Option>
                    </Select>
                </div>
                <div className={styles.select}>
                    <div className="mb-1">Merchant User:</div>
                    <Input
                        className={styles.textInput}
                        onChange={e => setMerchantUser(e.target.value)}
                    />
                </div>

                <div className={styles.select}>
                    <div className="mb-1">Order ID:</div>
                    <Input
                        className={styles.textInput}
                        onChange={e => setOrderId(e.target.value)}
                    />
                </div>

                <button className={styles.yellowBtn} onClick={handleExport}>
                    <img width={20} style={{ marginRight: 6 }} src={ic_export} alt="" />
                    {formatMessage({ id: 'EXPORT' })}
                </button>
            </div>
            <TableData listData={listData} />
        </div>
    );
}

export default connect(({ DASHBOARD }) => ({
    dashboardStore: DASHBOARD,
}))(withRouter(ListWithdraw));
