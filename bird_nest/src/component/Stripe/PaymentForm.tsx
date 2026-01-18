"use client";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

export function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment("", {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent?.status === "succeeded") {
      alert("Thanh toán thành công 🎉");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Thanh toán</button>
    </form>
  );
}
