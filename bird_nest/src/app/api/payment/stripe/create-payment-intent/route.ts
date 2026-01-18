import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: Request) {
  const { amount } = await req.json(); // amount tính bằng cents

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "vnd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log("paymentIntent", paymentIntent);
  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
