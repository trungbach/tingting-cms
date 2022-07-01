import React, { useState, useEffect, useCallback } from "react";
import { connect } from "dva";
import styles from "./styles.scss";
import PageTitle from "@/components/PageTitle";
import { router, withRouter } from "umi";
import moment from "moment";
import { DATE_FORMAT } from "@/config/constant";
import { formatVnd } from "@/util/function";
const statusTransaction = {
  0: "Chờ xử lý",
  1: "Đang xử lý",
  2: "Hoàn thành",
  3: "Đã từ chối",
  4: "Khách hàng đã hủy",
};

const typeTransaction = {
  borrow: 0,
  repayment: 1,
};

const checkedTransaction = {
  true: "Đã đối soát",
  false: "Chưa đối soát",
};
const statusTransactionValue = {
  created: 0,
  processing: 1,
  completed: 2,
  deny: 3,
  cancel: 4,
};

function DetailTransaction(props) {
  let { dispatch, transactionStore, masterDataStore, match } = props;
  const { transactionCode } = match.params;

  let { detailTransaction, loading } = transactionStore;

  console.log("detailTransaction", detailTransaction);

  useEffect(() => {
    let payload = {
      transactionCode,
    };
    dispatch({ type: "TRANSACTION/getDetailTransaction", payload });
  }, [transactionCode]);

  return (
    <div className={styles.content}>
      <PageTitle
        linkBack="/admin/transaction-manage"
        title="Chi tiết giao dịch"
      />
      <div className={styles.detail}>
        <div>
          <span>Tài khoản ngân hàng: </span>
          <div>{detailTransaction.bankAccount}</div>
        </div>
        <div>
          <span>Ngân hàng: </span>
          <div>{detailTransaction.bank?.name}</div>
        </div>
        <div>
          <span>Trạng thái: </span>
          <div>{statusTransaction[detailTransaction.status]}</div>
        </div>
        <div>
          <span>Loại giao dịch: </span>
          <div>
            {detailTransaction.type === typeTransaction.borrow
              ? "Ứng lương"
              : "Trả tiền"}
          </div>
        </div>
        <div>
          <span>Mã giao dịch: </span>
          <div>{detailTransaction.code}</div>
        </div>
        <div>
          <span>Số tiền: </span>
          <div>{formatVnd(detailTransaction.amount)}</div>
        </div>
        <div>
          <span>Phí rút: </span>
          <div>{formatVnd(detailTransaction.fee)}</div>
        </div>
        <div>
          <span>Ngày giao dịch: </span>
          <div>{moment(detailTransaction.createdAt).format(DATE_FORMAT)}</div>
        </div>
        <div>
          <span>Ghi chú: </span>
          <div>{detailTransaction.note || "Không có"}</div>
        </div>
        {detailTransaction.status === statusTransactionValue.deny && (
          <div>
            <span>Lý do từ chối: </span>
            <div>{detailTransaction.reason}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(({ MASTERDATA, TRANSACTION }) => ({
  transactionStore: TRANSACTION,
  masterDataStore: MASTERDATA,
}))(withRouter(DetailTransaction));
