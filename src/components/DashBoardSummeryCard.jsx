import { Card, Grid, Text } from "@mantine/core";

function DashBoardSummeryCard({ stats }) {
  return (
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
  );
}

export default DashBoardSummeryCard;
