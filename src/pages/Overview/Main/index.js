import React, { useEffect } from "react";
import { connect } from "dva";
import styles from "./styles.scss";
// import StaffChart from "./StaffChart";
import TransactionChart from "./TransactionChart";
import { formatVnd } from "@/util/function";
function Overview(props) {
  const { overviewStore, masterDataStore, dispatch } = props;
  const { dashboardData } = overviewStore;
  const { companyCode, companyId } = masterDataStore;

  console.log("dashboardData", dashboardData);

  useEffect(() => {
    if (companyCode) {
      dispatch({
        type: "OVERVIEW/getDashboard",
        payload: { companyCode: companyCode },
      });
    }
  }, [companyCode]);

  return (
    <div className={styles.content}>
      <div className="d-flex align-items-center justify-content-between">
        <div className={styles.boxValue}>
          <h3>Tổng hạn mức</h3>
          <div className={styles.value}>{formatVnd(dashboardData.budget)}</div>
        </div>
        <div className={styles.boxValue}>
          <h3>Hạn mức còn lại</h3>
          <div className={styles.value}>
            {formatVnd(dashboardData.remainingBudget)}
          </div>
        </div>
      </div>

      <div className={styles.totalList}>
        <div className={styles.totalItem}>
          <h4>Tổng giao dịch đã hoàn thành</h4>
          <div className={styles.totalValue}>
            <span>{dashboardData.numTransactions}</span> giao dịch
          </div>
        </div>
       
        <div className={styles.totalItem}>
          <h4>Tổng nhân viên</h4>
          <div className={styles.totalValue}>
            <span>{dashboardData.numStaffs}</span> người
          </div>
        </div>
        <div className={styles.totalItem}>
          <h4>Tổng dư nợ</h4>
          <div className={styles.totalValue}>
            <span>{formatVnd(dashboardData.borrowed)}</span>
          </div>
        </div>

        {/* <div className={styles.totalItem}>
          <h4>Tổng phí thu được</h4>
          <div className={styles.totalValue}>
            <span>111,077,344</span>
          </div>
        </div> */}

        <div className={styles.totalItem}>
          <h4>Tổng số tiền nhân viên đã ứng theo tháng</h4>
          {/* <StaffChart /> */}
          <TransactionChart />
        </div>
      </div>
    </div>
  );
}

export default connect(({ MASTERDATA, OVERVIEW }) => ({
  masterDataStore: MASTERDATA,
  overviewStore: OVERVIEW,
}))(Overview);
