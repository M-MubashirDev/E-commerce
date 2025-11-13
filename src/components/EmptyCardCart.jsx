import { Container, Paper, Text } from "@mantine/core";
import { FiShoppingBag } from "react-icons/fi";

function EmptyCardCart() {
  return (
    <div className="min-h-screen bg-light-gray">
      <Container size="xl" className="px-4 sm:px-6 lg:px-8 py-12">
        <Paper
          className="p-12 text-center backdrop-blur-lg border border-medium-gray/30"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
          }}
          radius="xl"
          shadow="lg"
        >
          <div className="max-w-md mx-auto">
            <FiShoppingBag size={64} className="text-gray-400 mx-auto mb-4" />
            <Text size="xl" fw={600} className="text-dark mb-2">
              Your cart is empty
            </Text>
            <Text className="text-gray-600 mb-6">
              Add some products to get started with your shopping
            </Text>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default EmptyCardCart;
