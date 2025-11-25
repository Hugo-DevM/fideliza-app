import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./DonutChart.module.css";
type Props = {
  redeemed?: number;
};

export default function DonutChart({ redeemed = 5 }: Props) {
  const data = [
    { name: "Unredeemed", value: 100 - redeemed },
    { name: "Redeemed", value: redeemed },
  ];

  const COLORS = ["#1f2937", "#1d2cff"];

  return (
    <div className={styles.container}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className={styles.data}>{redeemed}%</div>
    </div>
  );
}
