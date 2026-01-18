import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
//stripe listen --forward-to localhost:3000/api/payment/stripe/webhook
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;
  console.log("✅ Payment stripe nè");

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  // ✅ XỬ LÝ EVENT
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      console.log("✅ Payment succeeded:", paymentIntent.id);
      console.log("✅ Payment succeeded:", paymentIntent);

      // TODO:
      // - tạo order
      // - lưu DB
      // - cấp quyền user

      break;
    }

    case "payment_intent.payment_failed": {
      console.log("❌ Payment failed");
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
