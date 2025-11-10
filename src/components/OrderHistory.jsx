import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../features/orders/orderThunks";
import { Card, Text, Loader, Pagination, Table } from "@mantine/core";

export default function OrdersHistory() {
  const dispatch = useDispatch();
  const { orders, total, loading } = useSelector((state) => state.orders);
  const [page, setPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchUserOrders({ page, limit }));
  }, [page, dispatch]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Order History</h2>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader color="dark" />
        </div>
      )}

      {!loading && orders.length === 0 && (
        <Card withBorder className="p-6 text-center bg-gray-50">
          <Text>No orders found.</Text>
        </Card>
      )}

      {!loading && orders.length > 0 && (
        <>
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Address</Table.Th>
                <Table.Th>City</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {orders.map((order) => (
                <Table.Tr key={order.id}>
                  <Table.Td>{order.id}</Table.Td>
                  <Table.Td>Rs. {order.amount}</Table.Td>
                  <Table.Td>{order.address}</Table.Td>
                  <Table.Td>{order.city}</Table.Td>
                  <Table.Td>{order.status}</Table.Td>
                  <Table.Td>
                    {new Date(order.dateOrderPlaced).toLocaleDateString()}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Pagination
            total={totalPages}
            value={page + 1}
            onChange={(p) => setPage(p - 1)}
            siblings={1}
            boundaries={1}
            className="flex justify-center mt-6"
          />
        </>
      )}
    </div>
  );
}
