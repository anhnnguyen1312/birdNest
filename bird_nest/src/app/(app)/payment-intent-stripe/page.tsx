"use client";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import CheckoutForm from "@/component/Stripe/CheckoutForm";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    fetch("/api/payment/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 10000 }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setClientSecret(data.clientSecret);
      });
  }, []);

  if (!clientSecret) return <p>Loading...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
}
