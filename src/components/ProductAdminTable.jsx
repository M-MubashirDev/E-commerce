import {
  ActionIcon,
  Image,
  Loader,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { FiEdit2 } from "react-icons/fi";

function ProductAdminTable({ loading, products, handleEdit }) {
  return (
    <ScrollArea h={400}>
      {loading ? (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <Loader color="dark" size="lg" />
        </div>
      ) : (
        <Table
          highlightOnHover
          striped
          verticalSpacing="sm"
          horizontalSpacing="md"
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
              <Table.Th>IMAGE</Table.Th>
              <Table.Th>TITLE</Table.Th>
              <Table.Th>PRICE</Table.Th>
              <Table.Th>DISCOUNT</Table.Th>
              <Table.Th>QUANTITY / UNIT</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>ACTION</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {products.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={6} style={{ textAlign: "center" }}>
                  <Text c="#9ca3af" fs="italic">
                    No products found
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              products.map((prod) => (
                <Table.Tr key={prod.id}>
                  <Table.Td>
                    {prod.productImages?.[0] && (
                      <Image
                        src={prod.productImages[0].url}
                        alt={prod.title}
                        w={40}
                        h={40}
                        radius="md"
                        fit="contain"
                      />
                    )}
                  </Table.Td>
                  <Table.Td>{prod.title}</Table.Td>
                  <Table.Td>${prod.price}</Table.Td>
                  <Table.Td>
                    {prod.discount ? `${prod.discount}%` : "-"}
                  </Table.Td>
                  <Table.Td>
                    {prod.quantity} {prod.unitQuantity}
                  </Table.Td>
                  <Table.Td align="center">
                    <ActionIcon
                      color="dark"
                      variant="light"
                      radius="xl"
                      onClick={() => handleEdit(prod)}
                    >
                      <FiEdit2 size={18} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      )}
    </ScrollArea>
  );
}

export default ProductAdminTable;
