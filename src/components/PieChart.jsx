import { Pie, PieChart, Cell } from "recharts";

export default function TwoLevelPieChart({ data, isAnimationActive = true }) {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a569bd"];

  return (
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={70}
        fill="#8884d8"
        isAnimationActive={isAnimationActive}
        label
      >
        {data?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={75}
        outerRadius={90}
        fill="#82ca9d"
        isAnimationActive={isAnimationActive}
      >
        {data?.map((entry, index) => (
          <Cell
            key={`cell-outer-${index}`}
            fill={COLORS[(index + 1) % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
}
