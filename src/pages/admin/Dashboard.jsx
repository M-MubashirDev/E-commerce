import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../features/stats/statsThunk";
import { Card, Text, Grid, Loader, Title } from "@mantine/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TwoLevelPieChart from "../../components/PieChart";
import RecentOrdersTable from "../../components/RecentOrders";

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

  const orderStatusChart = stats?.orderStatus?.label.map((label, i) => ({
    name: label,
    value: stats.orderStatus.data[i],
  }));

  return (
    <div>
      <Title order={2} mb="lg" align="center">
        Dashboard
      </Title>

      {/* Summary Cards */}
      <Grid mb="xl" gutter="md">
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Text size="sm" fw={500}>
              Total Orders
            </Text>
            <Text fw={700} size="xl">
              {stats?.totalOrders}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Text size="sm" fw={500}>
              Revenue
            </Text>
            <Text fw={700} size="xl">
              Rs {stats?.ordersData.totalRevenue}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Text size="sm" fw={500}>
              Visitors This Month
            </Text>
            <Text fw={700} size="xl">
              {stats?.visitors.monthly}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Charts */}
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

      {/* Pie Chart & Recent Orders */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Text mb="sm" fw={600}>
              Order Status
            </Text>
            <ResponsiveContainer width="100%" height={250}>
              <TwoLevelPieChart data={orderStatusChart} />
            </ResponsiveContainer>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <RecentOrdersTable orders={stats?.recentOrders || []} />
        </Grid.Col>
      </Grid>
    </div>
  );
}
