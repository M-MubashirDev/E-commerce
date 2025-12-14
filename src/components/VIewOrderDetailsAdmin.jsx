import {
  Drawer,
  Stack,
  Text,
  Divider,
  Table,
  Tooltip,
  LoadingOverlay,
  Group,
} from "@mantine/core";
import { useSelector } from "react-redux";

export default function ViewOrderDetailsDrawer({ opened, onClose }) {
  const { orderDetails, loading } = useSelector((state) => state.orders);
  console.log("......");
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={`Order Details`}
      position="right"
      size="lg"
      overlayProps={{ opacity: 0.4, blur: 3 }}
    >
      <LoadingOverlay visible={loading} />

      {!loading && orderDetails && (
        <Stack spacing="md">
          {/* Client Information */}
          <div className="space-y-6">
            {/* Client Information */}
            <div className="p-4 bg-gray-50 rounded-md shadow-sm">
              <Text
                weight={700}
                size="lg"
                className="mb-2 border-b border-gray-200 pb-1"
              >
                Client Information
              </Text>
              <Stack spacing="xs" className="mt-2">
                <Group position="apart">
                  <Text className="!text-black">Name:</Text>
                  <Text weight={500}>{orderDetails.client?.name || "N/A"}</Text>
                </Group>
                <Group position="apart">
                  <Text className="!text-black">Email:</Text>
                  <Text weight={500}>
                    {orderDetails.client?.email || "N/A"}
                  </Text>
                </Group>
                <Group position="apart">
                  <Text className="!text-black">Phone:</Text>
                  <Text weight={500}>
                    {orderDetails.client?.phone || "N/A"}
                  </Text>
                </Group>
              </Stack>
            </div>

            {/* Order Information */}
            <div className="p-4 bg-gray-50 rounded-md shadow-sm">
              <Text
                weight={700}
                size="lg"
                className="mb-2 border-b border-gray-200 pb-1"
              >
                Order Information
              </Text>
              <Stack spacing="xs" className="mt-2">
                <Group position="apart">
                  <Text className="!text-black">Address:</Text>
                  <Text weight={500}>{orderDetails.address}</Text>
                </Group>
                <Group position="apart">
                  <Text className="!text-black">City:</Text>
                  <Text weight={500}>{orderDetails.city}</Text>
                </Group>
                <Group position="apart">
                  <Text className="!text-black">Phone:</Text>
                  <Text weight={500}>{orderDetails.phone}</Text>
                </Group>
                <Group position="apart">
                  <Text className="!text-black">Status:</Text>
                  <Text
                    weight={500}
                    className={
                      orderDetails.status === "delivered"
                        ? "text-green-600"
                        : orderDetails.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }
                  >
                    {orderDetails.status}
                  </Text>
                </Group>
                <Group position="apart">
                  <Text className="!text-black">Amount:</Text>
                  <Text weight={500}>${orderDetails.amount}</Text>
                </Group>
                <Group position="apart">
                  <Text className="!text-black">Date:</Text>
                  <Text weight={500}>
                    {new Date(orderDetails.dateOrderPlaced).toLocaleString()}
                  </Text>
                </Group>
              </Stack>
            </div>
          </div>

          <Divider />

          {/* Products Table */}
          <div>
            <Text weight={600}>Products</Text>
            <Table highlightOnHover verticalSpacing="sm" striped>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Discount</Table.Th>
                  <Table.Th>Total</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {orderDetails.productOrder?.map((po) => (
                  <Table.Tr key={po.id}>
                    <Table.Td>{po.product?.id}</Table.Td>
                    <Table.Td>
                      <Tooltip label={po.product?.description || ""} withArrow>
                        <Text
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "200px",
                          }}
                        >
                          {po.product?.title}
                        </Text>
                      </Tooltip>
                    </Table.Td>
                    <Table.Td>{po.quantity}</Table.Td>
                    <Table.Td>${po.product?.price}</Table.Td>
                    <Table.Td>{po.product?.discount || 0}%</Table.Td>
                    <Table.Td>
                      $
                      {(
                        po.quantity *
                        po.product?.price *
                        (1 - (po.product?.discount || 0) / 100)
                      ).toFixed(2)}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </Stack>
      )}
    </Drawer>
  );
}
