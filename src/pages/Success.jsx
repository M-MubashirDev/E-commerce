import { useLocation, useNavigate } from "react-router-dom";
import { Card, Text, Title, Button } from "@mantine/core";
import { FiCheckCircle, FiShoppingBag, FiClipboard } from "react-icons/fi";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const { orderId } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate("/products", { replace: true });
    }
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center py-12 px-4">
      <Card
        shadow="xl"
        padding="xl"
        radius="xl"
        className="w-full max-w-md bg-white animate-scale-in"
      >
        <div className="text-center space-y-6">
          {/* SUCCESS ICON */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <FiCheckCircle size={52} className="text-green-600" />
            </div>
          </div>

          {/* SUCCESS MESSAGE */}
          <div>
            <Title order={2} className="text-dark mb-2">
              Payment Successful
            </Title>
            <Text size="lg" className="text-gray-600">
              Your order has been placed successfully
            </Text>
          </div>

          {/* ORDER INFO */}
          <Card radius="md">
            <Text size="sm" className="!text-gray-600 !mb-2">
              Order Reference
            </Text>

            <Text
              size="sm"
              fw={600}
              className="!text-dark !flex !items-center !justify-center !gap-2"
            >
              <FiClipboard />#{orderId}
            </Text>

            <Text size="xs" className="!text-gray-500 !mt-2">
              Keep this ID for future reference
            </Text>
          </Card>

          {/* ACTIONS */}
          <div className="flex gap-4 justify-center mt-6">
            <Button
              leftSection={<FiShoppingBag size={18} />}
              onClick={() => navigate("/products", { replace: true })}
              className="bg-dark hover:bg-gray-800 transition-all hover:scale-[1.02]"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </Card>

      {/* Animations */}
      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}
