import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Text, Title, Button, Alert, List } from "@mantine/core";
import {
  FiXCircle,
  FiHome,
  FiRefreshCw,
  FiAlertTriangle,
} from "react-icons/fi";

export default function PaymentFailure() {
  const navigate = useNavigate();
  const location = useLocation();

  const { error, orderId } = location.state || {};

  useEffect(() => {
    if (!error && !orderId) {
      navigate("/", { replace: true });
    }
  }, [error, orderId, navigate]);

  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center py-12 px-4">
      <Card
        shadow="xl"
        padding="xl"
        radius="xl"
        className="w-full max-w-md bg-white animate-scale-in"
      >
        <div className="text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center animate-shake">
              <FiXCircle size={48} className="text-red-600" />
            </div>
          </div>

          {/* Error Message */}
          <div>
            <Title order={2} className="text-dark mb-2">
              Payment Failed
            </Title>
            <Text size="lg" className="text-gray-600">
              We couldn t process your payment
            </Text>
          </div>

          {/* Error Details */}
          {error && (
            <Alert
              color="red"
              title="Error Details"
              radius="md"
              icon={<FiAlertTriangle />}
              className="text-left border-2 border-red-300"
            >
              <Text size="sm" className="text-red-900">
                {error}
              </Text>
            </Alert>
          )}

          {orderId && (
            <Card
              withBorder
              radius="md"
              className="bg-gray-50 border-2 border-gray-300"
            >
              <Text size="sm" className="text-gray-600 mb-2">
                Reference ID
              </Text>
              <Text size="sm" fw={600} className="font-mono text-dark">
                #{orderId}
              </Text>
              <Text size="xs" className="text-gray-500 mt-2">
                Save this ID for support inquiries
              </Text>
            </Card>
          )}

          {/* Help Text */}
          <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
            <Text
              size="sm"
              fw={600}
              className="text-gray-800 mb-2 flex items-center gap-2"
            >
              <FiAlertTriangle className="text-yellow-600" />
              Common reasons for payment failure:
            </Text>
            <List size="xs" className="text-left text-gray-700 space-y-1">
              <List.Item>Insufficient funds in your account</List.Item>
              <List.Item>Incorrect card details entered</List.Item>
              <List.Item>Card expired or has been blocked</List.Item>
              <List.Item>Bank declined the transaction</List.Item>
              <List.Item>Network or connection issues</List.Item>
            </List>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-6 items-center">
            <Button
              //   size="lg"
              leftSection={<FiRefreshCw size={20} />}
              onClick={() => navigate("/ordersummery")}
              variant="filled"
              className="bg-dark hover:bg-gray-800 transition-all hover:scale-[1.02]"
            >
              Try Again
            </Button>

            <Button
              //   size="lg"
              leftSection={<FiHome size={20} />}
              onClick={() => navigate("/")}
              variant="light"
              className="transition-all hover:scale-[1.02]"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </Card>

      <style>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
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
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
