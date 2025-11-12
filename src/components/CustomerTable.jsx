import {
  Card,
  ScrollArea,
  Text,
  Tooltip,
  Image,
  Pagination,
  Loader,
  TextInput,
  Table,
  Avatar,
  Center,
} from "@mantine/core";
import { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";

export default function CustomerTable({
  users = [],
  loading,
  totalPages,
  currentPage,
  onPageChange,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return users;
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term) ||
        u.phone?.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  return (
    <Card shadow="none" p={0} radius="lg" withBorder>
      {/* Header */}
      <div className="flex items-center flex-col justify-between sm:flex-row p-4 border-b border-gray-200">
        <Text fw={600} size="lg" c="#111827" className="sm:inline hidden">
          Customers
        </Text>
        <div className="flex items-center sm:flex-row flex-col gap-2">
          <TextInput
            placeholder="Search user (this page)..."
            leftSection={<FiSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            radius="md"
            className="sm:w-[250px] w-[200px]"
          />
        </div>
      </div>

      {/* Table */}
      <ScrollArea h={400}>
        {loading ? (
          <Center p="lg">
            <Loader color="dark" size="lg" />
          </Center>
        ) : (
          <Table
            highlightOnHover
            verticalSpacing="sm"
            horizontalSpacing="md"
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
                <Table.Th>PHOTO</Table.Th>
                <Table.Th>NAME</Table.Th>
                <Table.Th>EMAIL</Table.Th>
                <Table.Th>PHONE</Table.Th>
                <Table.Th>CREATED AT</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {filteredUsers.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                    <Text c="#9ca3af" fs="italic">
                      No customers found on this page
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                filteredUsers.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>
                      {user.photoURL ? (
                        <Image
                          src={user.photoURL}
                          alt={user.name}
                          w={40}
                          h={40}
                          radius="xl"
                          fit="cover"
                        />
                      ) : (
                        <Avatar radius="xl" color="dark">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </Avatar>
                      )}
                    </Table.Td>

                    <Table.Td>
                      <Text fw={600} size="sm">
                        {user.name}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      <Tooltip label={user.email} withArrow>
                        <Text
                          size="sm"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {user.email}
                        </Text>
                      </Tooltip>
                    </Table.Td>

                    <Table.Td>
                      <Text size="sm">{user.phone || "-"}</Text>
                    </Table.Td>

                    <Table.Td>
                      {new Date(user.createdAt).toLocaleDateString()}
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
  );
}
