import ic_bank from '@/assets/image/ic_bank.png';
import ic_contract from '@/assets/image/ic_contract.png';
import ic_delete from '@/assets/image/ic_delete.svg';
import ic_edit from '@/assets/image/ic_edit.svg';
import ic_restore from '@/assets/image/ic_restore.svg';
import ic_search from '@/assets/image/ic_search.svg';
import EmptyComponent from '@/components/EmptyComponent';
import Loading from '@/components/Loading';
import { ADMIN_KEY, PAGE_SIZE, ROLE_ADMIN_SYSTEM } from '@/config/constant';
import { useSessionStorage } from '@/hooks';
import { Input, Modal, Pagination, Select, Switch, DatePicker } from 'antd';
import { connect } from 'dva';
import React, { useCallback, useEffect, useState } from 'react';
import { router, withRouter } from 'umi';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';
import { DATE_FILTER } from '@/config/constant';

import styles from './styles.scss';

const { RangePicker } = DatePicker;

const { confirm } = Modal;
const { Option } = Select;
const roleUser = {
    0: 'Nhân viên',
    1: 'Quản trị hệ thống',
    2: 'Quản trị doanh nghiệp',
};

const roleFilter = {
    ROLE_USER: 'ROLE_USER',
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_COMPANY: 'ROLE_COMPANY',
};

const statusUser = {
    UN_APPROVED: 0,
    APPROVED: 1,
};

function DeviceManagement(props) {
    let { dispatch, accountStore, masterStore } = props;
    let { accounts, totalRow, loading, deleteResponse, activeResponse } = accountStore;
    let { companyId } = masterStore;
    const [admin] = useSessionStorage(ADMIN_KEY);
    const [pageIndex, setPageIndex] = useState(1);
    const [name, setName] = useState();
    const [rangeTime, setRangeTime] = useState([]);
    const [role, setRole] = useState(
        admin?.role === ROLE_ADMIN_SYSTEM ? roleFilter.ROLE_ADMIN : roleFilter.ROLE_COMPANY,
    );

    const [deleted, setDeleted] = useState(false);

    const getAccounts = useCallback(
        payload => {
            dispatch({ type: 'ACCOUNT/getAccounts', payload });
        },
        [dispatch],
    );

    const deleteAccount = useCallback(
        payload => {
            dispatch({ type: 'ACCOUNT/deleteAccount', payload });
        },
        [dispatch],
    );

    const hideSelectCompanies = useCallback(
        payload => {
            dispatch({ type: 'MASTERDATA/hideSelectCompanies', payload });
        },
        [dispatch],
    );

    useEffect(() => {
        if (companyId) {
            let payload = {
                page: pageIndex - 1,
                name: name,
                role: role,
                deleted: deleted,
            };
            if (role !== roleFilter.ROLE_ADMIN) {
                payload.companyId = companyId;
            }
            getAccounts(payload);
        }
    }, [pageIndex, name, role, deleted, deleteResponse, activeResponse, companyId]);

    const goToCreate = () => {
        router.push('/home/create-account');
    };

    const goToEdit = accountCode => {
        router.push(`/admin/edit-account/${accountCode}`);
    };

    const handleDelete = accountCode => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa tài khoản này?',
            onOk: () => {
                deleteAccount({ code: accountCode });
            },
            onCancel: () => {},
        });
    };

    const listDevice = [
        {
            name: 'device1',
            accountHolder: 'User1',
            accountNumber: '12345678898',
            cardNumber: '12345678898',
            balance: 99999999,
            status: 'Active',
        },
        {
            name: 'device2',
            accountHolder: 'User2',
            accountNumber: '12345678898',
            cardNumber: '12345678898',
            balance: 99999999,
            status: 'Active',
        },
    ];

    const renderDataUsers = loading ? (
        <Loading />
    ) : listDevice.length === 0 ? (
        <EmptyComponent />
    ) : (
        listDevice.map((value, index) => (
            <tr className="row text-center" key={(value, index)}>
                <td className="col-2">{value.name}</td>
                <td className="col-2">{value.accountHolder}</td>
                <td className="col-2">{value.accountNumber}</td>
                <td className="col-2">{value.cardNumber}</td>
                <td className="col-2">{value.balance}</td>
                <td className="col-2">
                    <div className={styles.activeStatus}>{value.status}</div>
                </td>
            </tr>
        ))
    );
    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <div>
                    <h3>{formatMessage({ id: 'DEVICE_MANAGEMENT' })}</h3>
                </div>
            </div>
            <div className={styles.pageFilter}>
                <div style={{ height: 40 }}>
                    <div className="mb-1">{formatMessage({ id: 'DEVICE_NAME' })}:</div>
                    <Input className={styles.textInput} />
                </div>
                <div style={{ height: 40 }}>
                    <div className="mb-1">{formatMessage({ id: 'CARD_NUMBER' })}:</div>
                    <Input className={styles.textInput} />
                </div>
                <div style={{ height: 40 }}>
                    <div className="mb-1">{formatMessage({ id: 'ACCOUNT_HOLDER' })}:</div>
                    <Input className={styles.textInput} />
                </div>
                <div style={{ height: 40 }}>
                    <div className="mb-1">{formatMessage({ id: 'ACCOUNT_NUMBER' })}:</div>
                    <Input className={styles.textInput} />
                </div>
                <div className={styles.select}>
                    <div className="mb-1">{formatMessage({ id: 'STATUS' })}:</div>
                    <Select
                        style={{ minWidth: 180 }}
                        defaultValue=""
                        onChange={value => setRole(value)}
                    >
                        <Option value="">{formatMessage({ id: 'ALL' })}</Option>
                        <Option value="1">{formatMessage({ id: 'ACTIVE' })}</Option>
                        <Option value="3">{formatMessage({ id: 'LOCKED' })}</Option>
                    </Select>
                </div>
            </div>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr className="text-center">
                            <th className="col-2"> {formatMessage({ id: 'DEVICE_NAME' })}</th>
                            <th className="col-2"> {formatMessage({ id: 'ACCOUNT_HOLDER' })}</th>
                            <th className="col-2"> {formatMessage({ id: 'ACCOUNT_NUMBER' })}</th>
                            <th className="col-2">{formatMessage({ id: 'CARD_NUMBER' })}</th>
                            <th className="col-2">{formatMessage({ id: 'BALANCE' })}</th>
                            <th className="col-2">{formatMessage({ id: 'STATUS' })}</th>
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
        </div>
    );
}

export default connect(({ ACCOUNT, MASTERDATA }) => ({
    accountStore: ACCOUNT,
    masterStore: MASTERDATA,
}))(withRouter(DeviceManagement));
