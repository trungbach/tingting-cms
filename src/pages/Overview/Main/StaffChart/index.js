import React from "react";
import styles from "./styles.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StaffChart = () => {
  const data = [
    {
      name: "Tháng 1",
      amount: 2400,
    },
    {
      name: "Tháng 2",
      amount: 1398,
    },
    {
      name: "Tháng 3",
      amount: 9800,
    },
    {
      name: "Tháng 4",
      amount: 3908,
    },
    {
      name: "Tháng 5",
      amount: 4800,
    },
    {
      name: "Tháng 6",
      amount: 3800,
    },
    {
      name: "Tháng 7",
      amount: 4300,
    },
    {
      name: "Tháng 8",
      amount: 4300,
    },
    {
      name: "Tháng 9",
      amount: 4300,
    },
    {
      name: "Tháng 10",
      amount: 4300,
    },
    {
      name: "Tháng 11",
      amount: 4300,
    },
    {
      name: "Tháng 12",
      amount: 4300,
    },
  ];
  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="95%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StaffChart;
