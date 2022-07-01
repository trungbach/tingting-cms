import ic_bank from '@/assets/image/ic_bank.png';
import ic_contract from '@/assets/image/ic_contract.png';
import ic_delete from '@/assets/image/ic_delete.svg';
import ic_edit from '@/assets/image/ic_edit.svg';
import ic_restore from '@/assets/image/ic_restore.svg';
import ic_search from '@/assets/image/ic_search.svg';
import EmptyComponent from '@/components/EmptyComponent';
import Loading from '@/components/Loading';
import { ADMIN_KEY, pageSize, ROLE_ADMIN_SYSTEM } from '@/config/constant';
import { useSessionStorage } from '@/hooks';
import { Input, Modal, Pagination, Select, Switch } from 'antd';
import { connect } from 'dva';
import React, { useCallback, useEffect, useState } from 'react';
import { router, withRouter } from 'umi';
import styles from './styles.scss';
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
        router.push('/admin/create-account');
    };

    const goToContract = accountCode => {
        router.push(`/admin/contract-account/${accountCode}`);
    };

    const goToEdit = accountCode => {
        // getDetailAccount({ userCode: accountCode });
        router.push(`/admin/edit-account/${accountCode}`);
    };

    const goToBank = accountCode => {
        router.push(`/admin/bank-account/${accountCode}`);
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

    const handleRestore = accountCode => {
        confirm({
            title: 'Bạn có chắc chắn muốn khôi phục tài khoản này?',
            onOk: () => {
                restoreAccount({ code: accountCode });
            },
            onCancel: () => {},
        });
    };

    const handleFilterRole = role => {
        if (role === roleFilter.ROLE_ADMIN) {
            hideSelectCompanies(true);
        } else {
            hideSelectCompanies(false);
        }
        setRole(role);
        // router.push(`/admin/account-manage?role=${role}`);
    };

    const renderDataUsers = loading ? (
        <Loading />
    ) : accounts.length === 0 ? (
        <EmptyComponent />
    ) : (
        accounts.map((value, index) => (
            <tr className="row text-center" key={(value, index)}>
                <td className="col-1">{value.id}</td>
                <td className="col-2">{value.name}</td>
                <td className="col-1">{value.phone}</td>
                <td className="col-2">{value.email}</td>
                <td className="col-2">{value.positionInCompany}</td>
                <td className="col-1">{roleUser[value.role]}</td>
                <td
                    className={`col-1 ${styles.pointer}`}
                    onClick={() => handleActive(value.status, value.code)}
                >
                    <Switch size="small" checked={value.status === statusUser.APPROVED} />
                </td>
                <td className="col-2 d-flex" style={{ justifyContent: 'space-evenly' }}>
                    <img
                        className={styles.sizeIcon}
                        src={ic_edit}
                        onClick={() => goToEdit(value.code)}
                        alt="Edit"
                        title="Chỉnh sửa"
                    />
                    {deleted ? (
                        <img
                            className={styles.sizeIcon}
                            src={ic_restore}
                            onClick={() => handleRestore(value.code)}
                            alt="Delete"
                            title="Khôi phục"
                        />
                    ) : (
                        <img
                            className={styles.sizeIcon}
                            src={ic_delete}
                            onClick={() => handleDelete(value.code)}
                            alt="Delete"
                            title="Xóa"
                        />
                    )}

                    <img
                        className={styles.sizeIcon}
                        src={ic_contract}
                        onClick={() => goToContract(value.code)}
                        alt="See contract"
                        title="Xem hợp đồng"
                    />

                    <img
                        className={styles.sizeIcon}
                        src={ic_bank}
                        onClick={() => goToBank(value.code)}
                        alt="Bank Account"
                        title="Thông tin ngân hàng"
                    />
                </td>
            </tr>
        ))
    );

    return (
        <div className={styles.content}>
            <div className={styles.filterByRole}>
                {admin?.role === ROLE_ADMIN_SYSTEM && (
                    <span
                        className={role === roleFilter.ROLE_ADMIN ? styles.activeRole : styles.role}
                        onClick={() => handleFilterRole(roleFilter.ROLE_ADMIN)}
                    >
                        Quản trị hệ thống
                    </span>
                )}
                <span
                    className={role === roleFilter.ROLE_COMPANY ? styles.activeRole : styles.role}
                    onClick={() => handleFilterRole(roleFilter.ROLE_COMPANY)}
                >
                    Quản trị viên công ty
                </span>
                <span
                    className={role === roleFilter.ROLE_USER ? styles.activeRole : styles.role}
                    onClick={() => handleFilterRole(roleFilter.ROLE_USER)}
                >
                    Nhân viên
                </span>
            </div>
            <div className={styles.pageFilter}>
                <Input
                    prefix={<img src={ic_search} alt="ic_search" />}
                    className={styles.textInput}
                    placeholder="Tìm kiếm theo tên"
                    onChange={e => setName(e.target.value)}
                />

                <div className={styles.select}>
                    <Select defaultValue={false} onChange={value => setDeleted(value)}>
                        <Option value={true}>Đã xóa</Option>
                        <Option value={false}>Chưa xóa</Option>
                    </Select>
                </div>
                <button className={styles.primaryBtn} onClick={goToCreate}>
                    Tạo tài khoản
                </button>
                {/* {admin?.role === ROLE_ADMIN_SYSTEM &&
        role === roleFilter.ROLE_USER ? null : (
          <button className={styles.primaryBtn} onClick={goToCreate}>
            Tạo tài khoản
          </button>
        )} */}
            </div>

            <div className={styles.table}>
                <table>
                    <thead>
                        <tr className="text-center">
                            <th className="col-1">ID</th>
                            <th className="col-2">Tên</th>
                            <th className="col-1">Điện thoại</th>
                            <th className="col-2">Email</th>
                            <th className="col-2">Chức vụ</th>
                            <th className="col-1">Vai trò</th>
                            <th className="col-1">Trạng thái</th>
                            <th className="col-2">Hành động</th>
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
                        pageSize={pageSize}
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
