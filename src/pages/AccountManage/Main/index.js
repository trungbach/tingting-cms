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

function AccountManage(props) {
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

    const activeUser = useCallback(
        payload => {
            dispatch({ type: 'ACCOUNT/activeUser', payload });
        },
        [dispatch],
    );

    const unactiveUser = useCallback(
        payload => {
            dispatch({ type: 'ACCOUNT/unactiveUser', payload });
        },
        [dispatch],
    );

    const deleteAccount = useCallback(
        payload => {
            dispatch({ type: 'ACCOUNT/deleteAccount', payload });
        },
        [dispatch],
    );

    const restoreAccount = useCallback(
        payload => {
            dispatch({ type: 'ACCOUNT/restoreAccount', payload });
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
        if (admin?.role === ROLE_ADMIN_SYSTEM) {
            hideSelectCompanies(true);
        }
        return () => {
            hideSelectCompanies(false);
        };
    }, [admin]);

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

    const handleActive = (userStatus, userCode) => {
        confirm({
            title:
                userStatus === statusUser.UN_APPROVED
                    ? 'Bạn có chắc muốn kích hoạt tài khoản này không?'
                    : 'Bạn có chắc muốn bỏ kích hoạt tài khoản này không?',
            onOk: () => {
                userStatus === statusUser.APPROVED
                    ? unactiveUser({ code: userCode })
                    : activeUser({ code: userCode });
            },
        });
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

    const listAccount = [
        {
            id: 1,
            name: 'User1',
            role: 'Merchant',
            email: 'merchant@gmail.com',
            status: 'Normal',
            createdAt: '22-10-2022',
        },
        {
            id: 2,
            name: 'User2',
            role: 'User',
            email: 'user@gmail.com',
            status: 'Normal',
            createdAt: '22-10-2022',
        },
    ];

    const renderDataUsers = loading ? (
        <Loading />
    ) : listAccount.length === 0 ? (
        <EmptyComponent />
    ) : (
        listAccount.map((value, index) => (
            <tr className="row text-center" key={(value, index)}>
                <td className="col-1">{value.id}</td>
                <td className="col-2">{value.name}</td>
                <td className="col-2">{value.role}</td>
                <td className="col-2">{value.email}</td>
                <td className="col-1">{value.status}</td>
                <td className="col-2">{value.createdAt}</td>
                <td className="col-2 d-flex" style={{ justifyContent: 'space-evenly' }}>
                    <img
                        className={styles.sizeIcon}
                        src={ic_edit}
                        onClick={() => goToEdit(value.code)}
                        alt="Edit"
                        title="Chỉnh sửa"
                    />
                    <img
                        className={styles.sizeIcon}
                        src={ic_delete}
                        onClick={() => handleDelete(value.code)}
                        alt="Delete"
                        title="Xóa"
                    />
                </td>
            </tr>
        ))
    );
    function disabledDate(current) {
        // Can not select days after today and today
        return current && current > moment().endOf('day');
    }
    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <div>
                    <h3>{formatMessage({ id: 'ACCOUNT_MANAGEMENT' })}</h3>
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
                    <div className="mb-1"> {formatMessage({ id: 'ROLE' })}:</div>
                    <Select
                        style={{ minWidth: 180 }}
                        defaultValue=""
                        onChange={value => setRole(value)}
                    >
                        <Option value=""> {formatMessage({ id: 'ROLE' })}</Option>
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
                        onChange={value => setRole(value)}
                    >
                        <Option value="">{formatMessage({ id: 'STATUS' })}</Option>
                        <Option value="23">Chờ xử lý</Option>
                        <Option value="234">Đang xử lý</Option>
                        <Option value="235">Hoàn thành</Option>
                        <Option value="236">Từ chối</Option>
                        <Option value="237">Khách hàng hủy giao dịch</Option>
                    </Select>
                </div>
                <div style={{ height: 40 }}>
                    <div className="mb-1">{formatMessage({ id: 'NAME' })}:</div>
                    <Input className={styles.textInput} />
                </div>
                <div style={{ height: 40, marginLeft: 'auto' }}>
                    <button className={styles.primaryBtn} onClick={goToCreate}>
                        {formatMessage({ id: 'ADD_ACCOUNT' })}
                    </button>
                </div>
            </div>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr className="text-center">
                            <th className="col-1">ID</th>
                            <th className="col-2"> {formatMessage({ id: 'USERNAME' })}</th>
                            <th className="col-2"> {formatMessage({ id: 'ROLE' })}</th>
                            <th className="col-2">{formatMessage({ id: 'EMAIL' })}</th>
                            <th className="col-1">{formatMessage({ id: 'STATUS' })}</th>
                            <th className="col-2">{formatMessage({ id: 'CREATED_AT' })}</th>
                            <th className="col-2">{formatMessage({ id: 'ACTION' })}</th>
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
}))(withRouter(AccountManage));
