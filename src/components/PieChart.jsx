import { Card, Grid, Text } from "@mantine/core";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

export default function TwoLevelPieChart({ data, isAnimationActive = true }) {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a569bd"];

  return (
    <Grid.Col span={{ base: 12, md: 6 }}>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Text mb="sm" fw={600}>
          Order Status
        </Text>
        <ResponsiveContainer width="100%" height={250}>
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
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
        </ResponsiveContainer>
      </Card>
    </Grid.Col>
  );
}
