import ic_check from "@/assets/image/ic_check.svg";
import ic_export from "@/assets/image/ic_export.png";
import ic_eye from "@/assets/image/ic_eye.svg";
import ic_uncheck from "@/assets/image/ic_uncheck.svg";
import Loading from "@/components/Loading";
import EmptyComponent from "@/components/EmptyComponent";
import {
    ADMIN_KEY,
    DATE_STATEMENT,
    pageSize,
    ROLE_ADMIN_SYSTEM,
    TOKEN_KEY
} from "@/config/constant";
import config from "@/config/index";
import { useSessionStorage } from "@/hooks";
import { formatVnd } from "@/util/function";
import { Modal, Pagination } from "antd";
import { connect } from "dva";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { router } from "umi";
import styles from "./styles.scss";
const { confirm } = Modal;

const StatementManage = props => {
    const { statementStore, masterDataStore, dispatch } = props;
    const { statements, loading, totalRow, repaymentResponse } = statementStore;
    const { companyId } = masterDataStore;
    const [pageIndex, setPageIndex] = useState(1);
    const [admin] = useSessionStorage(ADMIN_KEY);

    useEffect(() => {
        if (companyId) {
            let payload = {
                page: pageIndex - 1,
                companyId: companyId
            };
            dispatch({ type: "STATEMENT/getStatements", payload: payload });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyId, pageIndex, repaymentResponse]);

    const goToDetail = statementId => {
        router.push(`/admin/transaction-statement-manage/${statementId}`);
    };

    const companyRepayment = useCallback(
        payload => {
            dispatch({ type: "STATEMENT/companyRepayment", payload });
        },
        [dispatch]
    );

    const handleRepayment = statementId => {
        if (admin?.role !== ROLE_ADMIN_SYSTEM) {
            return;
        }
        confirm({
            title: "Bạn có muốn xác nhận trả nợ?",
            onOk: () => {
                companyRepayment({ id: statementId });
            },
            onCancel: () => {}
        });
    };

    const handleExport = statementId => {
        const url = "api/admin/v1/money-statement/export-transactions";
        var params = getQueryString({
            statementId: statementId
        });
        fetch(config.API_DOMAIN + url + "?" + params, {
            method: "GET",
            headers: {
                "Content-Type": "application/xlsx",
                Authorization: "Bearer " + sessionStorage.getItem(TOKEN_KEY)
            }
        })
            .then(response => response.blob())
            .then(blob => {
                // Create blob link to download
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `transaction.xlsx`);

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    };

    const getQueryString = queries => {
        return Object.keys(queries)
            .reduce((result, key) => {
                return [
                    ...result,
                    `${encodeURIComponent(key)}=${encodeURIComponent(
                        queries[key]
                    )}`
                ];
            }, [])
            .join("&");
    };

    const renderDataStatement = loading ? (
        <Loading />
    ) : statements.length === 0 ? (
        <EmptyComponent />
    ) : (
        statements.map((value, index) => (
            <tr className="text-center" key={(value, index)}>
                <td className="col-1">{value.id}</td>
                <td className="col-2">
                    {moment(value.startAd).format(DATE_STATEMENT)}
                </td>
                <td className="col-2">
                    {moment(value.endAt).format(DATE_STATEMENT)}
                </td>
                <td className="col-3">{formatVnd(value.debitAmount)}</td>
                <td className="col-2">
                    {value.status === 0 ? (
                        <img
                            onClick={() => handleRepayment(value.id)}
                            src={ic_uncheck}
                            className={styles.sizeIcon}
                            alt=""
                        />
                    ) : (
                        <img
                            src={ic_check}
                            className={styles.sizeIcon}
                            alt=""
                        />
                    )}
                </td>

                <td className="col-2">
                    <div className="d-flex justify-content-center">
                        <img
                            style={{ marginRight: 10 }}
                            className={styles.sizeIcon}
                            src={ic_eye}
                            onClick={() => goToDetail(value.id)}
                            alt="detail"
                            title="Xem"
                        />
                        <img
                            className={styles.sizeIcon}
                            src={ic_export}
                            onClick={() => handleExport(value.id)}
                            alt="repayment"
                            title="Xuất báo cáo"
                        />
                    </div>
                </td>
            </tr>
        ))
    );

    return (
        <div className={styles.content}>
            <div className={styles.pageTitle}>Quản lý sao kê</div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr className="text-center">
                            <th className="col-1">ID</th>
                            <th className="col-2">Bắt đầu từ</th>
                            <th className="col-2">Kết thúc</th>
                            <th className="col-3">Số tiền</th>
                            <th className="col-2">Trạng thái</th>
                            <th className="col-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>{renderDataStatement}</tbody>
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
};

export default connect(({ MASTERDATA, STATEMENT }) => ({
    statementStore: STATEMENT,
    masterDataStore: MASTERDATA
}))(StatementManage);
