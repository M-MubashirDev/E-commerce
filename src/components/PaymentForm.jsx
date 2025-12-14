import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Alert, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { confirmPayment } from "../features/orders/orderThunks";
import { clearCart } from "../features/cart/cartSlice";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default function PaymentForm({ clientSecret, orderId }) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isProcessing = useRef(false); // Prevent double submission

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setLoading(false);
      setError(null);
      isProcessing.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (isProcessing.current) {
      return;
    }

    if (!stripe || !elements) {
      setError("Payment system not ready. Please refresh the page.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Payment form not loaded properly.");
      return;
    }

    isProcessing.current = true;
    setLoading(true);
    setError(null);

    try {
      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        isProcessing.current = false;
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Confirm payment with backend
        try {
          await dispatch(confirmPayment(orderId)).unwrap();

          // Clear cart and navigate to success
          dispatch(clearCart());
          navigate("/paymentSuccess", {
            replace: true,
            state: {
              orderId,
              amount: paymentIntent.amount / 100,
            },
          });
        } catch (backendError) {
          console.error("Backend confirmation error:", backendError);
          navigate("/failure", {
            replace: true,
            state: {
              error:
                "Payment processed but order confirmation failed. Please contact support.",
              orderId,
            },
          });
        }
      } else {
        setError("Payment could not be completed. Please try again.");
        setLoading(false);
        isProcessing.current = false;
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
      isProcessing.current = false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Text size="sm" fw={500} mb="xs" className="text-dark">
          Card Information
        </Text>
        <div className="p-4 border-2 border-gray-300 rounded-lg bg-white focus-within:border-dark transition-colors">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      {error && (
        <Alert
          color="red"
          title="Payment Error"
          radius="md"
          className="border-2 border-red-300"
        >
          <Text size="sm" className="text-red-900">
            {error}
          </Text>
        </Alert>
      )}

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate("/ordersummery")}
          disabled={loading || isProcessing.current}
          className="text-gray-600 hover:text-dark"
        >
          Back
        </Button>
        <Button
          type="submit"
          loading={loading}
          disabled={!stripe || loading || isProcessing.current}
          className="transition-all hover:scale-[1.02] bg-dark text-white"
        >
          {loading ? "Processing Payment..." : "Pay Now"}
        </Button>
      </div>
    </form>
  );
}
