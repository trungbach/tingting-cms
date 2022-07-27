import ic_delete from '@/assets/image/ic_delete.svg';
import EmptyComponent from '@/components/EmptyComponent';
import Loading from '@/components/Loading';
import { ADMIN_KEY, DATE_FILTER, DATE_TIME, PAGE_SIZE, Role, RoleName } from '@/config/constant';
import { useLocalStorage } from '@/hooks';
import { DatePicker, Input, Modal, Pagination, Select } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { router, withRouter } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './styles.scss';
import ic_edit from '@/assets/image/ic_edit.svg';
import ic_eye from '@/assets/image/ic_eye.svg';
import ModalUpdateStaff from '../ModalUpdateStaff';
import ModalSecret from '../ModalSecret';

import { formatVnd } from '@/util/function';
import ModalUpdateAgent from '../ModalUpdateAgent';

const { RangePicker } = DatePicker;

const { confirm } = Modal;
const { Option } = Select;

function AccountManage(props) {
    let { dispatch, accountStore } = props;
    let { accounts, totalRow, loading, deleteResponse, updateResponse, listSecret } = accountStore;
    const [admin] = useLocalStorage(ADMIN_KEY);
    const [pageIndex, setPageIndex] = useState(1);
    const [showSecret, setShowSecret] = useState(false);
    const [name, setName] = useState();
    const [rangeTime, setRangeTime] = useState([]);
    const [currentStaff, setCurrentStaff] = useState({
        isShow: false,
        id: undefined,
    });
    const [currentAgent, setCurrentAgent] = useState({
        isShow: false,
        id: undefined,
    });
    const [role, setRole] = useState(RoleName[Role.ROLE_STAFF]);

    console.log('admin', admin);
    const deleteAccount = useCallback(
        payload => {
            dispatch({ type: 'ACCOUNT/deleteAccount', payload });
        },
        [dispatch],
    );

    useEffect(() => {
        let payload = {
            page: pageIndex - 1,
            phone: name,
            role: role,
            deleted: false,
            timeStart: rangeTime?.[0],
            timeEnd: rangeTime?.[1],
        };
        dispatch({ type: 'ACCOUNT/getAccounts', payload });
    }, [pageIndex, name, role, deleteResponse, updateResponse, rangeTime, dispatch]);

    const goToCreate = () => {
        router.push('/home/create-account');
    };

    const handleDelete = accountId => {
        confirm({
            title: formatMessage({ id: 'ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_ACCOUNT' }),
            onOk: () => {
                deleteAccount({ id: accountId });
            },
            onCancel: () => {},
        });
    };

    const handleEdit = id => {
        if (role === RoleName[Role.ROLE_USER]) {
            setCurrentStaff({
                isShow: true,
                id,
            });
        } else {
            setCurrentAgent({
                isShow: true,
                id,
            });
        }
    };

    const handleGetSecret = userId => {
        const payload = {
            userId,
        };

        dispatch({ type: 'ACCOUNT/getSercret', payload });
        setShowSecret(true);
    };

    const renderDataUsers = loading ? (
        <Loading />
    ) : accounts.length === 0 ? (
        <EmptyComponent />
    ) : (
        accounts.map((value, index) => (
            <tr className="row text-center" key={(value, index)}>
                <td
                    className={
                        role !== RoleName[Role.ROLE_USER] && role !== RoleName[Role.ROLE_AGENT]
                            ? 'col-2'
                            : 'col-1'
                    }
                >
                    {value.id}
                </td>
                <td
                    className={
                        role !== RoleName[Role.ROLE_USER] && role !== RoleName[Role.ROLE_AGENT]
                            ? 'col-3'
                            : 'col-2'
                    }
                >
                    {value.phone}
                </td>
                <td className="col-2">{value.email}</td>
                {(role === RoleName[Role.ROLE_USER] || role === RoleName[Role.ROLE_AGENT]) && (
                    <td className="col-2">{formatVnd(value.totalMoney)}</td>
                )}

                <td className="col-3">{moment(value.createdAt).format(DATE_TIME)}</td>
                <td className="col-2 d-flex" style={{ justifyContent: 'space-evenly' }}>
                    {role === RoleName[Role.ROLE_USER] && (
                        <>
                            <img
                                className={styles.sizeIcon}
                                src={ic_edit}
                                onClick={() => handleEdit(value.id)}
                                alt="Edit"
                            />
                            <img
                                className={styles.sizeIcon}
                                src={ic_eye}
                                onClick={() => handleGetSecret(value.id)}
                                alt="Edit"
                            />
                        </>
                    )}

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
    return (
        <div className={styles.content}>
            {currentStaff.isShow && (
                <ModalUpdateStaff currentStaff={currentStaff} setCurrentStaff={setCurrentStaff} />
            )}
            {currentAgent.isShow && (
                <ModalUpdateAgent currentAgent={currentAgent} setCurrentAgent={setCurrentAgent} />
            )}
            {showSecret && (
                <ModalSecret
                    listSecret={listSecret}
                    showSecret={showSecret}
                    setShowSecret={setShowSecret}
                />
            )}

            <div className={styles.header}>
                <div>
                    <h3>{formatMessage({ id: 'ACCOUNT_MANAGEMENT' })}</h3>
                </div>
                <div className={styles.filterByRole}>
                    <span
                        className={
                            role === RoleName[Role.ROLE_STAFF] ? styles.activeRole : styles.role
                        }
                        onClick={() => setRole(RoleName[Role.ROLE_STAFF])}
                    >
                        {formatMessage({ id: 'ROLE_STAFF' })}
                    </span>
                    <span
                        className={
                            role === RoleName[Role.ROLE_ACCOUNTANT]
                                ? styles.activeRole
                                : styles.role
                        }
                        onClick={() => setRole(RoleName[Role.ROLE_ACCOUNTANT])}
                    >
                        {formatMessage({ id: 'ROLE_ACCOUNTANT' })}
                    </span>
                    <span
                        className={
                            role === RoleName[Role.ROLE_USER] ? styles.activeRole : styles.role
                        }
                        onClick={() => setRole(RoleName[Role.ROLE_USER])}
                    >
                        {formatMessage({ id: 'ROLE_USER' })}
                    </span>
                    <span
                        className={
                            role === RoleName[Role.ROLE_AGENT] ? styles.activeRole : styles.role
                        }
                        onClick={() => setRole(RoleName[Role.ROLE_AGENT])}
                    >
                        {formatMessage({ id: 'ROLE_AGENT' })}
                    </span>
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
                <div style={{ height: 40 }}>
                    <div className="mb-1">{formatMessage({ id: 'NAME' })}:</div>
                    <Input onChange={e => setName(e.target.value)} className={styles.textInput} />
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
                            <th
                                className={
                                    role !== RoleName[Role.ROLE_USER] &&
                                    role !== RoleName[Role.ROLE_AGENT]
                                        ? 'col-2'
                                        : 'col-1'
                                }
                            >
                                ID
                            </th>
                            <th
                                className={
                                    role !== RoleName[Role.ROLE_USER] &&
                                    role !== RoleName[Role.ROLE_AGENT]
                                        ? 'col-3'
                                        : 'col-2'
                                }
                            >
                                {' '}
                                {formatMessage({ id: 'USERNAME' })}
                            </th>
                            <th className="col-2">{formatMessage({ id: 'EMAIL' })}</th>

                            {role === RoleName[Role.ROLE_USER] && (
                                <th className="col-2">{formatMessage({ id: 'BALANCE' })}</th>
                            )}
                            {role === RoleName[Role.ROLE_AGENT] && (
                                <th className="col-2">{formatMessage({ id: 'BALANCE' })}</th>
                            )}
                            <th className="col-3">{formatMessage({ id: 'CREATED_AT' })}</th>
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

export default connect(({ ACCOUNT }) => ({
    accountStore: ACCOUNT,
}))(withRouter(AccountManage));
