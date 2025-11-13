import {
  Drawer,
  Stack,
  Text,
  Divider,
  Table,
  Tooltip,
  LoadingOverlay,
} from "@mantine/core";
import { useSelector } from "react-redux";

export default function ViewOrderDetailsDrawer({ opened, onClose }) {
  const { orderDetails, loading } = useSelector((state) => state.orders);

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
          <div>
            <Text weight={600}>Client Information</Text>
            <Text>Name: {orderDetails.client?.name}</Text>
            <Text>Email: {orderDetails.client?.email}</Text>
            <Text>Phone: {orderDetails.client?.phone || "N/A"}</Text>
          </div>

          <Divider />

          {/* Order Information */}
          <div>
            <Text weight={600}>Order Information</Text>
            <Text>Address: {orderDetails.address}</Text>
            <Text>City: {orderDetails.city}</Text>
            <Text>Phone: {orderDetails.phone}</Text>
            <Text>Status: {orderDetails.status}</Text>
            <Text>Amount: ${orderDetails.amount}</Text>
            <Text>
              Date: {new Date(orderDetails.dateOrderPlaced).toLocaleString()}
            </Text>
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
