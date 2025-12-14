import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Card, Text, Title, Accordion } from "@mantine/core";
import PaymentForm from "../components/PaymentForm";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Payment() {
  const { cart } = useSelector((state) => state.cart);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const totalAmount = cart.total + cart.shipping + cart.tax;

  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center px-4">
      <Card
        radius="xl"
        shadow="xl"
        className="w-full max-w-5xl overflow-hidden"
        padding={0}
      >
        {/* TOP SPLIT CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT — BLACK TOTAL */}
          <div className="bg-black text-white p-10 flex flex-col justify-center">
            <Text size="sm" className="!text-gray-400 mb-2">
              Total Amount
            </Text>

            <Title
              order={1}
              className="text-white font-extrabold tracking-tight"
              style={{ fontSize: "3rem" }}
            >
              {formatPrice(totalAmount)}
            </Title>

            <Text size="sm" className="text-gray-400 mt-4">
              Including taxes & shipping
            </Text>
          </div>

          {/* RIGHT — WHITE PAYMENT */}
          <div className="bg-white p-10">
            <Title order={3} className="text-dark mb-6">
              Payment Details
            </Title>

            <Elements stripe={stripePromise} key="payment-elements">
              <PaymentForm />
            </Elements>
          </div>
        </div>

        {/* BOTTOM — DROPDOWN (ATTACHED) */}
        <div className="!bg-white">
          <Accordion variant="contained" bg={"white"}>
            <Accordion.Item value="summary" bg={"white"}>
              <Accordion.Control bg={"white"}>Order Details</Accordion.Control>

              <Accordion.Panel>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart?.items?.map((item) => {
                    const discountedPrice =
                      item.price - item.price * (item.discount / 100);

                    return (
                      <div
                        key={item.id}
                        className="flex gap-3 p-2 rounded-lg bg-gray-50"
                      >
                        <img
                          src={item.images?.[0] || "/batman.jpg"}
                          alt={item.title}
                          className="w-14 h-14 rounded object-cover"
                        />

                        <div className="flex-1">
                          <Text size="sm" fw={600}>
                            {item.title}
                          </Text>
                          <Text size="xs" className="text-gray-600">
                            Qty {item.currentQuantity} ×{" "}
                            {formatPrice(discountedPrice)}
                          </Text>
                        </div>

                        <Text size="sm" fw={600}>
                          {formatPrice(discountedPrice * item.currentQuantity)}
                        </Text>
                      </div>
                    );
                  })}
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </Card>
    </div>
  );
}
