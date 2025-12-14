import { Card, Grid, Text } from "@mantine/core";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

export default function SingleLevelPieChart({
  data,
  isAnimationActive = true,
}) {
  const STATUS_COLORS = {
    cancelled: "#ff7f50",
    pending: "#ffc658",
    delivered: "#82ca9d",
  };

  return (
    <Grid.Col span={{ base: 12, md: 6 }}>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Text mb="sm" fw={600}>
          Order Status
        </Text>
        <ResponsiveContainer width="100%" height={235}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={90}
              isAnimationActive={isAnimationActive}
              label
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          {data?.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: STATUS_COLORS[item.name] }}
              />
              <Text size="sm" className="capitalize text-gray-700">
                {item.name} ({item.value})
              </Text>
            </div>
          ))}
        </div>
      </Card>
    </Grid.Col>
  );
}
