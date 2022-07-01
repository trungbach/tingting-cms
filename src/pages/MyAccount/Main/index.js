import React, { useEffect } from "react";
import styles from "./styles.scss";
import { connect } from "dva";
import Loading from "@/components/Loading";
const userStatus = {
  UNACTIVE: 0,
  ACTIVE: 1,
};

const userGender = {
  0: "Nam",
  1: "Nữ",
};
const MyProfile = (props) => {
  const { dispatch, masterdataStore } = props;
  const { myProfile, loading } = masterdataStore;

  useEffect(() => {
    dispatch({
      type: "MASTERDATA/getMyProfile",
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.content}>
      <div className={styles.pageTitle}>Chi tiết tài khoản</div>
      <div className={styles.account}>
        <div className="row">
          <div className="col-5">
            <div className={styles.accountImg}>
              {myProfile.avatar?.originUrl && (
                <img src={myProfile.avatar?.originUrl} alt="account" />
              )}
            </div>
          </div>
          <div className="col-7">
            <div className={styles.accountInfo}>
              <div className="row">
                <div className="col-4">Tên</div>
                <div className="col-8">{myProfile.name}</div>
              </div>
              <div className="row">
                <div className="col-4">Sđt</div>
                <div className="col-8">{myProfile.phone}</div>
              </div>
              <div className="row">
                <div className="col-4">Email</div>
                <div className="col-8">{myProfile.email}</div>
              </div>
              <div className="row">
                <div className="col-4">Ngày sinh</div>
                <div className="col-8">{myProfile.birthday}</div>
              </div>
              <div className="row">
                <div className="col-4">Giới tính</div>
                <div className="col-8">{userGender[myProfile.gender]}</div>
              </div>
              <div className="row">
                <div className="col-4">Địa chỉ</div>
                <div className="col-8">{myProfile.address}</div>
              </div>
              <div className="row">
                <div className="col-4">Trạng thái</div>
                <div className="col-8">
                  {myProfile.status === userStatus.ACTIVE
                    ? "Đã kích hoạt"
                    : "Chưa kích hoạt"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <button
          style={{ marginLeft: "auto", marginTop: 15 }}
          className={styles.primaryBtn}
          onClick={() => router.push(`/admin/edit-account/${userCode}`)}
        >
          Sửa thông tin
        </button> */}
      </div>
    </div>
  );
};

export default connect(({ MASTERDATA }) => ({
  masterdataStore: MASTERDATA,
}))(MyProfile);
