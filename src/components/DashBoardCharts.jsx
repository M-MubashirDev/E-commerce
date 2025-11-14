import { Card, Grid, Text } from "@mantine/core";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function DashBoardCharts({ ordersChart, salesChart }) {
  return (
    <Grid mb="xl" gutter="md">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text mb="sm" fw={600}>
            Orders Over Months
          </Text>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ordersChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text mb="sm" fw={600}>
            Sales Over Months
          </Text>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Grid.Col>
    </Grid>
  );
}

export default DashBoardCharts;
