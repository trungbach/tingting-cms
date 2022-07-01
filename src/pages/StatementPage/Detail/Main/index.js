import React, { useEffect, useState, useCallback } from "react";
import styles from "./styles.scss";
import { router, withRouter } from "umi";
import { connect } from "dva";
import Loading from "@/components/Loading";
import EmptyComponent from "@/components/EmptyComponent";
import PageTitle from "@/components/PageTitle";
import ic_eye from "@/assets/image/ic_eye.svg";
import ic_repayment from "@/assets/image/ic_repayment.png";
import moment from "moment";
import { Pagination, Modal, message, Input } from "antd";
import { formatVnd } from "@/util/function";

import { DATE_FORMAT, pageSize } from "@/config/constant";
const typeTransaction = {
  borrow: 0,
  repayment: 1,
};

const statusTransaction = {
  0: "Chờ xử lý",
  1: "Đang xử lý",
  2: "Hoàn thành",
  3: "Đã từ chối",
  4: "Khách hàng đã hủy",
};

const { confirm } = Modal;

const TransactionsStatement = (props) => {
  const { statementStore,masterDataStore, dispatch,match } = props;
  const { transactions, loading, totalRow } = statementStore;
  const [pageIndex, setPageIndex] = useState(1);
  const {transactionId} = match.params;
  console.log('withRouter',props )
  useEffect(() => {
    if(transactionId) {
      let payload = {
        page: pageIndex - 1,
        statementId: transactionId,
      };
      dispatch({ type: "STATEMENT/getTransactions", payload: payload });
    }
  }, [transactionId, pageIndex]);


  const renderDataTransaction = loading ? (
    <Loading />
  ) : transactions.length === 0 ? (
    <EmptyComponent />
  ) : (
    transactions.map((value, index) => (
    
         <tr className="text-center" key={(value, index)}>
         <td className="col-2">{value.name}</td>
          <td className="col-2">{value.phone}</td>
          <td className="col-2">
            {moment(value.createdAt).format(DATE_FORMAT)}
          </td>
          <td
            className="col-2"
            style={{
              color: value.type === typeTransaction.borrow ? "red" : "green",
            }}
          >
            {formatVnd(value.amount)}
          </td>
          <td className="col-2">{formatVnd(value.fee)}</td>
          <td className="col-2">{statusTransaction[value.status]}</td>
      </tr>
    ))
  );

  return (
    <div className={styles.content}>
      <PageTitle linkBack="/admin/statement-manage" title='Chi tiết giao dịch' />
      <div className={styles.table}>
        <table>
          <thead>
            <tr className="text-center">
            <th className="col-2">Tên</th>
              <th className="col-2">Điện thoại</th>
              <th className="col-2">Thời gian giao dịch</th>
              <th className="col-2">Số tiền</th>
              <th className="col-2">Phí</th>
              <th className="col-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>{renderDataTransaction}</tbody>
        </table>

        <div className={styles.pagination}>
          <Pagination
            onChange={(page) => setPageIndex(page)}
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
  masterDataStore: MASTERDATA,
}))(withRouter(TransactionsStatement));
