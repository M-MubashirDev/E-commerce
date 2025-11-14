import {
  Card,
  ScrollArea,
  Text,
  Pagination,
  Loader,
  TextInput,
  Drawer,
  ActionIcon,
  Table,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";
import { FiSearch, FiEdit2 } from "react-icons/fi";
import OrdersAction from "./OrdersAction";
import ViewOrderDetailsDrawer from "./VIewOrderDetailsAdmin";
import { fetchOrderDetails } from "../features/orders/orderThunks";
import { useDispatch } from "react-redux";

export default function OrdersTable({
  orders,
  loading,
  totalPages,
  currentPage,
  onPageChange,
  onSearch,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [drawerOpenedDetail, setDrawerOpenedDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const dispatch = useDispatch();

  const handleView = async (order) => {
    setDrawerOpened(true);
    await dispatch(fetchOrderDetails(order.id)).unwrap();
  };
  function handleChangeTerm(values) {
    setSearchTerm(values);
    setTimeout(() => {
      onSearch(searchTerm);
    }, 500);
  }
  const handleEdit = (order) => {
    setSelectedOrder(order);
    setDrawerOpened(true);
  };

  return (
    <>
      <Card shadow="none" p={0} radius="lg" withBorder>
        {/* Header */}
        <div className="flex items-center flex-col justify-between sm:flex-row p-4 border-b border-gray-200">
          <Text fw={600} size="lg" c="#111827" className="sm:inline hidden">
            Orders List
          </Text>
          <div className="flex items-center sm:flex-row flex-col gap-2">
            <TextInput
              placeholder="Search by address..."
              leftSection={<FiSearch size={16} />}
              value={searchTerm}
              onChange={(e) => handleChangeTerm(e.target.value)}
              radius="md"
              className="sm:w-[250px] w-[200px]"
            />
          </div>
        </div>

        {/* Table */}
        <ScrollArea h={400}>
          {loading ? (
            <div style={{ padding: "2rem", textAlign: "center" }}>
              <Loader color="dark" size="lg" />
            </div>
          ) : (
            <Table
              highlightOnHover
              verticalSpacing="sm"
              horizontalSpacing="md"
              withColumnBorders={false}
              striped
            >
              <Table.Thead
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>ADDRESS</Table.Th>
                  <Table.Th>CITY</Table.Th>
                  <Table.Th>PHONE</Table.Th>
                  <Table.Th>AMOUNT</Table.Th>
                  <Table.Th>STATUS</Table.Th>
                  <Table.Th>DATE</Table.Th>
                  <Table.Th style={{ textAlign: "center" }}>ACTION</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {orders.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={8} style={{ textAlign: "center" }}>
                      <Text c="#9ca3af" fs="italic">
                        No orders found
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  orders.map((order) => (
                    <Table.Tr
                      key={order.id}
                      onClick={() => {
                        handleView(order);
                      }}
                      className="!cursor-pointer"
                    >
                      <Table.Td>{order.id}</Table.Td>
                      <Table.Td>
                        <Tooltip label={order.address} withArrow>
                          <Text
                            size="sm"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "200px",
                            }}
                          >
                            {order.address}
                          </Text>
                        </Tooltip>
                      </Table.Td>
                      <Table.Td>{order.city}</Table.Td>
                      <Table.Td>{order.phone}</Table.Td>
                      <Table.Td>${order.amount}</Table.Td>
                      <Table.Td>{order.status}</Table.Td>
                      <Table.Td>
                        {new Date(order.dateOrderPlaced).toLocaleDateString()}
                      </Table.Td>
                      <Table.Td align="center">
                        <div className="flex justify-center gap-2">
                          <ActionIcon
                            color="dark"
                            variant="light"
                            radius="xl"
                            onClick={() => handleEdit(order)}
                          >
                            <FiEdit2 size={18} />
                          </ActionIcon>
                        </div>
                      </Table.Td>
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          )}
        </ScrollArea>

        {/* Pagination */}
        {!loading && (
          <div className="py-3 flex justify-center border-t border-gray-200">
            <Pagination
              total={totalPages}
              value={currentPage + 1}
              onChange={(page) => onPageChange(page - 1)}
              color="dark"
            />
          </div>
        )}
      </Card>

      {/* Drawer for Add/Edit */}
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        title={"Edit Order"}
        position="right"
        size="lg"
        overlayProps={{ opacity: 0.4, blur: 3 }}
      >
        <OrdersAction
          existingOrder={selectedOrder}
          onClose={() => setDrawerOpened(false)}
        />
      </Drawer>
      <ViewOrderDetailsDrawer
        opened={drawerOpenedDetail}
        onClose={() => setDrawerOpenedDetail(false)}
      />
    </>
  );
}
