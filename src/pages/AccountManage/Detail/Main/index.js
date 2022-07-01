import React, { useEffect } from "react";
import styles from "./styles.scss";
import { connect } from "dva";
import { withRouter, router } from "umi";
import ic_back from "@/assets/image/ic_back.png";
import img_account from "@/assets/image/img_account.png";
import Loading from "@/components/Loading";

const userStatus = {
  UNACTIVE: 0,
  ACTIVE: 1,
};

const userGender = {
  1: "Nam",
  2: "Nữ",
  3: "Khác",
};
const DetailAccount = (props) => {
  const { match, dispatch, accountStore } = props;
  const { userCode } = match.params;
  const { detailAccount, loading } = accountStore;

  useEffect(() => {
    dispatch({
      type: "ACCOUNT/getDetailAccount",
      payload: { userCode: userCode },
    });
  }, [userCode]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.content}>
      <div className={styles.pageTitle}>
        <img
          src={ic_back}
          alt="back"
          className={styles.sizeIcon}
          style={{ marginRight: 10 }}
          onClick={() => router.push("/admin/account-manage")}
        />
        Chi tiết tài khoản
      </div>
      <div className={styles.account}>
        <div className="row">
          <div className="col-5">
            <div className={styles.accountImg}>
              <img
                src={detailAccount.avatar?.originUrl || img_account}
                alt="account"
              />
            </div>
          </div>
          <div className="col-7">
            <div className={styles.accountInfo}>
              <div className="row">
                <div className="col-4">Tên</div>
                <div className="col-8">{detailAccount.name}</div>
              </div>
              <div className="row">
                <div className="col-4">Sđt</div>
                <div className="col-8">{detailAccount.phone}</div>
              </div>
              <div className="row">
                <div className="col-4">Email</div>
                <div className="col-8">{detailAccount.email}</div>
              </div>
              <div className="row">
                <div className="col-4">Ngày sinh</div>
                <div className="col-8">{detailAccount.birthday}</div>
              </div>
              <div className="row">
                <div className="col-4">Giới tính</div>
                <div className="col-8">{userGender[detailAccount.gender]}</div>
              </div>
              <div className="row">
                <div className="col-4">Địa chỉ</div>
                <div className="col-8">{detailAccount.address}</div>
              </div>
              <div className="row">
                <div className="col-4">Trạng thái</div>
                <div className="col-8">
                  {detailAccount.status === userStatus.ACTIVE
                    ? "Đã kích hoạt"
                    : "Chưa kích hoạt"}
                </div>
              </div>
              <div className="row">
                <div className="col-4">Hạn mức</div>
                <div className="col-8">{detailAccount.budget} VNĐ</div>
              </div>
            </div>
          </div>
        </div>

        <button
          style={{ marginLeft: "auto", marginTop: 15 }}
          className={styles.primaryBtn}
          onClick={() => router.push(`/admin/edit-account/${userCode}`)}
        >
          Sửa thông tin
        </button>
      </div>
    </div>
  );
};

export default connect(({ ACCOUNT }) => ({
  accountStore: ACCOUNT,
}))(withRouter(DetailAccount));
