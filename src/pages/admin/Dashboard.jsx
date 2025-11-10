import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../features/stats/statsThunk";
import { Card, Text, Grid, Loader, Table, Title } from "@mantine/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <Text c="red">{error}</Text>;

  // Transform chart data
  const ordersChart = stats?.ordersData?.chartData?.labels.map((label, i) => ({
    month: label,
    orders: stats.ordersData.chartData.data[i],
  }));

  const salesChart = stats?.sales?.chartData?.labels.map((label, i) => ({
    month: label,
    sales: stats.sales.chartData.data[i],
  }));

  const visitorsChart = stats?.visitors?.chartData?.labels.map((label, i) => ({
    month: label,
    visitors: stats.visitors.chartData.data[i],
  }));

  const orderStatusChart = stats?.orderStatus?.label.map((label, i) => ({
    name: label,
    value: stats.orderStatus.data[i],
  }));

  return (
    <div>
      <Title order={2} mb="md">
        Dashboard
      </Title>

      {/* Summary Cards */}
      <Grid mb="md">
        <Grid.Col span={4}>
          <Card shadow="sm" p="lg">
            <Text>Total Orders</Text>
            <Text fw={700} size="xl">
              {stats.totalOrders}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="sm" p="lg">
            <Text>Revenue</Text>
            <Text fw={700} size="xl">
              Rs {stats.ordersData.totalRevenue}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="sm" p="lg">
            <Text>Visitors This Month</Text>
            <Text fw={700} size="xl">
              {stats.visitors.monthly}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Charts */}
      <Grid mb="md">
        <Grid.Col span={6}>
          <Card shadow="sm" p="lg">
            <Text mb="sm">Orders Over Months</Text>
            <LineChart width={500} height={250} data={ordersChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#8884d8" />
            </LineChart>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card shadow="sm" p="lg">
            <Text mb="sm">Sales Over Months</Text>
            <LineChart width={500} height={250} data={salesChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
            </LineChart>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Pie Chart for Order Status */}
      <Grid mb="md">
        <Grid.Col span={6}>
          <Card shadow="sm" p="lg">
            <Text mb="sm">Order Status</Text>
            <PieChart width={400} height={300}>
              <Pie
                data={orderStatusChart}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {orderStatusChart?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </Card>
        </Grid.Col>

        {/* Recent Orders Table */}
        <Grid.Col span={6}>
          <Card shadow="sm" p="lg">
            <Text mb="sm">Recent Orders</Text>
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.client.name}</td>
                    <td>Rs {order.amount}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}
