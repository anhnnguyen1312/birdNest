// "use client";

// import { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { PaymentForm } from "./PaymentForm";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// export default function CheckoutForm({ orderId }: { orderId: string }) {
//   const [clientSecret, setClientSecret] = useState<string | null>(null);

//   useEffect(() => {
//     async function createPayment() {
//       const res = await fetch("/api/orders/create-payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ orderId }),
//       });

//       const data = await res.json();
//       setClientSecret(data.clientSecret);
//     }

//     createPayment();
//   }, [orderId]);

//   if (!clientSecret) return <p>Đang tạo thanh toán...</p>;

//   return (
//     <Elements stripe={stripePromise} options={{ clientSecret }}>
//       <PaymentForm />
//     </Elements>
//   );
// }
"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment",
      },
    });

    if (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe} className="mt-4">
        Pay
      </button>
    </form>
  );
}
