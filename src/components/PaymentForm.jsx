import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Text, Paper } from "@mantine/core";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { createOrder, confirmPayment } from "../features/orders/orderThunks";
import { useSelector } from "react-redux";
import { FiAlertCircle } from "react-icons/fi";

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

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { location: delivery } = useSelector((state) => state.location);

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

    if (isProcessing.current) return;

    if (!stripe || !elements) {
      setError("Payment system not ready");
      return;
    }

    isProcessing.current = true;
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Create order ONLY when user pays
      const orderObject = {
        address: delivery.address,
        city: delivery.city,
        phone: delivery.phone,
        items: cart.items.map((item) => ({
          productId: item.id,
          quantity: item.currentQuantity,
        })),
      };

      const orderRes = await dispatch(createOrder(orderObject)).unwrap();

      const { client_secret, orderId } = orderRes.result;

      // 2️⃣ Confirm Stripe payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        let userMessage = stripeError.message;

        switch (stripeError.code) {
          case "card_declined":
            userMessage =
              "Your card was declined. Please try another card or contact your bank.";
            break;
          case "expired_card":
            userMessage = "Your card has expired. Please use a different card.";
            break;
          case "insufficient_funds":
            userMessage = "Insufficient funds. Please try another card.";
            break;
          case "incorrect_cvc":
            userMessage = "Incorrect CVC. Please check and try again.";
            break;
          case "processing_error":
            userMessage = "Processing error. Please try again in a moment.";
            break;
          default:
            userMessage = "Payment failed. Please try again.";
        }

        setError(userMessage);
        setLoading(false);
        isProcessing.current = false;
        return;
      }

      // 3️⃣ Backend confirmation
      if (paymentIntent.status === "succeeded") {
        await dispatch(confirmPayment(orderId)).unwrap();

        dispatch(clearCart());

        navigate("/paymentSuccess", {
          replace: true,
          state: {
            orderId,
            amount: paymentIntent.amount / 100,
          },
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Payment failed");
      navigate("/failure", {
        replace: true,
        state: {
          error:
            err.message ||
            "Something went wrong while processing your order. Please try again.",
          orderId: err?.orderId,
        },
      });
    } finally {
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
        <Paper p="md" radius="md" className="bg-red-50 border-2 border-red-400">
          <div className="flex items-start gap-3">
            <FiAlertCircle
              size={24}
              className="text-red-600 flex-shrink-0 mt-1"
            />
            <div>
              <Text size="sm" fw={600} className="text-red-900 mb-1">
                Payment Error
              </Text>
              <Text size="sm" className="text-red-800">
                {error}
              </Text>
            </div>
          </div>
        </Paper>
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
        >
          Pay Now
        </Button>
      </div>
    </form>
  );
}
