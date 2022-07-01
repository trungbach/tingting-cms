import Loading from "@/components/Loading";
import PageTitle from "@/components/PageTitle";
import { connect } from "dva";
import React, { useEffect } from "react";
import { withRouter } from "umi";
import styles from "./styles.scss";

const BankAccount = (props) => {
  const { match, dispatch, accountStore } = props;
  const { userCode } = match.params;
  const { bankAccount, loading } = accountStore;

  useEffect(() => {
    let payload = { userCode: userCode };
    dispatch({ type: "ACCOUNT/getBankAccount", payload: payload });
  }, [userCode]);

  const renderBankAccount = loading ? (
    <Loading />
  ) : bankAccount === undefined ? (
    <h1>Tài khoản này chưa liên kết với ngân hàng nào.</h1>
  ) : (
    <div className="row">
      <div className="col-5">
        <div className={styles.accountImg}>
          {bankAccount?.bank?.logo?.originUrl && (
            <img src={bankAccount.bank?.logo?.originUrl} alt="account" />
          )}
        </div>
      </div>
      <div className="col-7">
        <div className={styles.accountInfo}>
          <div className="row">
            <div className="col-4">Ngân hàng</div>
            <div className="col-8">{bankAccount.bank?.name}</div>
          </div>
          <div className="row">
            <div className="col-4">Chủ tài khoản</div>
            <div className="col-8">{bankAccount.name}</div>
          </div>
          <div className="row">
            <div className="col-4">Số tài khoản</div>
            <div className="col-8">{bankAccount.account}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.content}>
      <PageTitle
        linkBack="/admin/account-manage"
        title="Xem thông tin ngân hàng"
      />
      <div className={styles.bank}>{renderBankAccount}</div>
    </div>
  );
};

export default connect(({ ACCOUNT }) => ({
  accountStore: ACCOUNT,
}))(withRouter(BankAccount));
