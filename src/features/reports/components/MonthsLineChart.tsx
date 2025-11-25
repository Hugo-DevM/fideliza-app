import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data?: { month: string; value: number }[];
};

const fakeData = [
  { month: "Ene", value: 40 },
  { month: "Feb", value: 30 },
  { month: "Mar", value: 50 },
  { month: "Abr", value: 20 },
  { month: "May", value: 60 },
  { month: "Jun", value: 45 },
];

export default function MonthsLineChart({ data = fakeData }: Props) {
  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2f5d7c"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
