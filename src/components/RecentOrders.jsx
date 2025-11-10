"use client";

import { Card, ScrollArea, Badge, Text, Group } from "@mantine/core";

const formatAmount = (amount) => {
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  return amount < 0 ? `-${formatted}` : formatted;
};

const getStatusStyles = (status) => {
  switch (status.toLowerCase()) {
    case "open":
    case "pending":
      return { bg: "#e0e7ff", color: "#4f46e5", label: "Pending" };
    case "paid":
    case "completed":
      return { bg: "#dcfce7", color: "#16a34a", label: "Paid" };
    case "inactive":
    case "cancelled":
      return { bg: "#fee2e2", color: "#dc2626", label: "Cancelled" };
    default:
      return { bg: "#f3f4f6", color: "#6b7280", label: status };
  }
};

export default function RecentOrdersTable({ orders = [] }) {
  return (
    <Card
      shadow="none"
      p={0}
      radius="lg"
      withBorder
      style={{
        borderColor: "#e5e7eb",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "black",
          padding: "12px 16px",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Group
          justify="space-between"
          style={{ color: "white", fontWeight: 600, fontSize: "0.875rem" }}
        >
          <Text span style={{ flex: 3 }} className="!text-white">
            CUSTOMER
          </Text>
          <Text
            span
            style={{ flex: 1, textAlign: "center" }}
            className="!text-white"
          >
            STATUS
          </Text>
          <Text
            span
            style={{ flex: 1, textAlign: "right" }}
            className="!text-white"
          >
            AMOUNT
          </Text>
        </Group>
      </div>

      {/* Table Body */}
      <ScrollArea h={300}>
        <div style={{ minWidth: 600 }}>
          {orders.length === 0 ? (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "#9ca3af",
                fontStyle: "italic",
              }}
            >
              No recent orders
            </div>
          ) : (
            orders.map((order, index) => {
              const status = getStatusStyles(order.status);
              const amount = parseFloat(order.amount) || 0;

              return (
                <div
                  key={order.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9fafb",
                    borderBottom: "1px solid #e5e7eb",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* Customer Info */}
                  <div style={{ flex: 3 }}>
                    <Text fw={600} size="sm" c="#111827">
                      {order.client.name}
                    </Text>
                    <Text size="xs" c="#6b7280">
                      {order.client.email || "No email provided"}
                    </Text>
                  </div>

                  {/* Status */}
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <Badge
                      variant="filled"
                      size="sm"
                      radius="xl"
                      style={{
                        backgroundColor: status.bg,
                        color: status.color,
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        padding: "0 10px",
                      }}
                    >
                      {status.label}
                    </Badge>
                  </div>

                  {/* Amount */}
                  <div style={{ flex: 1, textAlign: "right" }}>
                    <Text size="sm" fw={500} c="#111827">
                      ${formatAmount(amount)}
                    </Text>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
