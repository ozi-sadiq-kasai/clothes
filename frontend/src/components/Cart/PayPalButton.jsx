import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PayPalButton = ({ amount, checkoutData }) => {
  const navigate = useNavigate();

  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount.toFixed(2) } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            console.log("Payment Successful:", details);
            
            // Store checkout data in localStorage
            localStorage.setItem("checkoutData", JSON.stringify({ ...checkoutData, transaction: details }));

            // Redirect to Order Confirmation Page
            navigate("/order-confirmation");
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
          alert("Payment failed. Please try again.");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
