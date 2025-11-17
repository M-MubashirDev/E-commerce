import { useEffect } from "react";
import { Grid, Title } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../features/stats/statsThunk";

import ErrorMessage from "../../ui/ErrorMessage";
import TwoLevelPieChart from "../../components/PieChart";
import RecentOrdersTable from "../../components/RecentOrders";
import DashBoardCharts from "../../components/DashBoardCharts";
import DashBoardSummeryCard from "../../components/DashBoardSummeryCard";

import { Spinner } from "../../ui/Spinners";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;

  const salesChart = stats?.sales?.chartData?.labels.map((label, i) => ({
    month: label,
    sales: stats.sales.chartData.data[i],
  }));
  const orderStatusChart = stats?.orderStatus?.label.map((label, i) => ({
    name: label,
    value: stats.orderStatus.data[i],
  }));
  const ordersChart = stats?.ordersData?.chartData?.labels.map((label, i) => ({
    month: label,
    orders: stats.ordersData.chartData.data[i],
  }));

  return (
    <div>
      <Title order={2} mb="lg" align="center">
        Dashboard
      </Title>
      <DashBoardSummeryCard stats={stats} />
      <DashBoardCharts ordersChart={ordersChart} salesChart={salesChart} />
      <Grid gutter="md">
        <TwoLevelPieChart data={orderStatusChart} />
        <Grid.Col span={{ base: 12, md: 6 }}>
          <RecentOrdersTable orders={stats?.recentOrders || []} />
        </Grid.Col>
      </Grid>
    </div>
  );
}
