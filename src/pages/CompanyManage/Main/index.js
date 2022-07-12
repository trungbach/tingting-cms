import React, { useEffect, useState, useCallback } from 'react';
import styles from './styles.scss';
import { router } from 'umi';
import { connect } from 'dva';
import Loading from '@/components/Loading';
import EmptyComponent from '@/components/EmptyComponent';
import ic_edit from '@/assets/image/ic_edit.svg';
import ic_eye from '@/assets/image/ic_eye.svg';
import ic_delete from '@/assets/image/ic_delete.svg';
import moment from 'moment';
import { Pagination, Modal, message, Input } from 'antd';
import { DATE_FORMAT, PAGE_SIZE } from '@/config/constant';
import { formatVnd } from '@/util/function';
const { confirm } = Modal;

const CompanyManage = props => {
    const { companyStore, dispatch } = props;
    const { companies, loading, totalRow, deleteResponse } = companyStore;

    const [pageIndex, setPageIndex] = useState(1);
    const [name, setName] = useState();

    const hideSelectCompanies = useCallback(
        payload => {
            dispatch({ type: 'MASTERDATA/hideSelectCompanies', payload });
        },
        [dispatch],
    );
    useEffect(() => {
        hideSelectCompanies(true);
        return () => {
            hideSelectCompanies(false);
        };
    }, []);

    useEffect(() => {
        let payload = {
            page: pageIndex - 1,
            name: name,
        };
        dispatch({ type: 'COMPANY/getListCompanies', payload: payload });
    }, [name, pageIndex, deleteResponse]);

    const goToDetail = companyCode => {
        router.push(`/admin/detail-company/${companyCode}`);
    };

    const goToEdit = companyCode => {
        router.push(`/admin/update-company/${companyCode}`);
    };

    const companyRepayment = useCallback(
        payload => {
            dispatch({ type: 'COMPANY/companyRepayment', payload });
        },
        [dispatch],
    );

    const deleteCompany = useCallback(
        payload => {
            dispatch({ type: 'COMPANY/deleteCompany', payload });
        },
        [dispatch],
    );

    const handleDelete = companyCode => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa doanh nghiệp này?',
            onOk: () => {
                deleteCompany({ code: companyCode });
            },
            onCancel: () => {},
        });
    };

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
                    placeholder="Nhập số tiền"
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
                    companyRepayment({ code: userCode, amount: amount });
                }
            },
            onCancel: () => {},
        });
    };

    const renderDataCompanies = loading ? (
        <Loading />
    ) : companies.length === 0 ? (
        <EmptyComponent />
    ) : (
        companies.map((value, index) => (
            <tr className="text-center" key={(value, index)}>
                <td className="col-1">{value.code}</td>
                <td className="col-2">{value.name}</td>
                <td className="col-2">{formatVnd(value.budget)}</td>
                <td className="col-2">{formatVnd(value.borrowed)}</td>
                <td className="col-2">{value.address}</td>
                <td className="col-1">{moment(value.createdAt).format(DATE_FORMAT)}</td>
                <td className="col-2">
                    <div className="d-flex justify-content-center">
                        <img
                            style={{ marginRight: 10 }}
                            className={styles.sizeIcon}
                            src={ic_eye}
                            onClick={() => goToDetail(value.code)}
                            alt="detail"
                            title="Xem"
                        />
                        <img
                            style={{ marginRight: 10 }}
                            className={styles.sizeIcon}
                            src={ic_edit}
                            onClick={() => goToEdit(value.code)}
                            alt="edit"
                            title="Sửa"
                        />
                        <img
                            style={{ marginRight: 10 }}
                            className={styles.sizeIcon}
                            src={ic_delete}
                            onClick={() => handleDelete(value.code)}
                            alt="Delete"
                            title="Xóa"
                        />
                    </div>
                </td>
            </tr>
        ))
    );

    return (
        <div className={styles.content}>
            <div className={styles.pageTitle}>Danh sách doanh nghiệp</div>
            <div className={styles.pageFilter}>
                <Input
                    className={styles.textInput}
                    placeholder="Tìm kiếm theo tên"
                    onChange={e => setName(e.target.value)}
                />
                <button
                    className={styles.primaryBtn}
                    onClick={() => router.push('/admin/create-company')}
                >
                    Thêm doanh nghiệp
                </button>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr className="text-center">
                            <th className="col-1">Mã</th>
                            <th className="col-2">Tên</th>
                            <th className="col-2">Hạn mức</th>
                            <th className="col-2">Khoản vay</th>
                            <th className="col-2">Địa chỉ</th>
                            <th className="col-1">Ngày tạo</th>
                            <th className="col-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>{renderDataCompanies}</tbody>
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
};

export default connect(({ MASTERDATA, COMPANY }) => ({
    companyStore: COMPANY,
    masterDataStore: MASTERDATA,
}))(CompanyManage);
