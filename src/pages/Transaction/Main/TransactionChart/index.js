import React, { useEffect } from "react";
import styles from "./styles.scss";
import { Chart, Tooltip, Interval } from "bizcharts";
import { connect } from "dva";

const TransactionChart = (props) => {
  const { overviewStore, masterDataStore, dispatch } = props;
  const { transactionResponse } = overviewStore;

  const { companyId, companies } = masterDataStore;
  console.log("transactionResponse", transactionResponse);

  useEffect(() => {
    if (companies.length) {
      const company = companies.find((company) => company.id === companyId);
      dispatch({
        type: "OVERVIEW/getTransactionChart",
        payload: { companyCode: company.code },
      });
    }
  }, [companyId, companies]);

  const convertData = (input) => {
    var output = [];
    input.map((transaction) => {
      output.push({
        name: "Số tiền:",
        key: transaction.key,
        value: transaction.value,
      });
    });
    return output;
  };

  return (
    <div className={styles.chart}>
      <Chart
        height={400}
        padding="auto"
        data={convertData(transactionResponse)}
        autoFit
      >
        <Interval
          adjust={[
            {
              type: "dodge",
              marginRatio: 0,
            },
          ]}
          color="name"
          position="key*value"
        />
        <Tooltip shared />
      </Chart>
    </div>
  );
};

export default connect(({ MASTERDATA, OVERVIEW }) => ({
  masterDataStore: MASTERDATA,
  overviewStore: OVERVIEW,
}))(TransactionChart);
