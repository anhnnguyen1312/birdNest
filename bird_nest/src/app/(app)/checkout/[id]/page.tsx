import Checkout from "@/component/Checkout/Checkout";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwtVerify from "@/helper/jwtVerify";
import refreshAcessToken from "@/helper/refreshAccessToken";
import { CartItems } from "@/models/CartItems.model";
import { Cart } from "@/models/Cart.model";
import { Products } from "@/models/Products.model";
import { CheckoutSession, ProductVariant } from "@/types";
import sequelize from "@/lib/sequelize";
import joseVerify from "@/helper/joseVerify";

interface CartItemsType {
  cartId: number;
  createdAt: string;
  id: number;
  productId: number;
  productVariants: ProductVariant;
  products: {
    discountPrice: number;
    id: number;
    imageUrlThumb: string;
    name: string;
    price: number;
  };
  quantity: number;
  updatedAt: string;
  varientId: number;
}
const item: CartItemsType[] = [];
let data: CheckoutSession | null;
async function page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  console.log("id", id);
  try {
    await sequelize.authenticate();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const cookieHeader = cookieStore.toString(); // stringify toàn bộ cookie

    const userId = await joseVerify(accessToken);
    console.log("userId", userId);
    if (!accessToken || !userId) {
      redirect("/login");
    }
    const fetchCheckoutSession = async (id: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/checkout-sessions?id=${id}`,
        {
          method: "GET",
          headers: {
            Cookie: cookieHeader, // 🔥 forward cookie
          },
          cache: "no-store", // rất quan trọng nếu là auth
        }
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch checkout session (status: ${res.status})`
        );
      }
      if (res.ok) {
        const data = await res.json();
        console.log("data", data);
        return data.checkoutSession;
      }
    };
    data = await fetchCheckoutSession(id as string);
    // console.log("res", res);

    // const checkout: CheckoutSession = await res.json();
  } catch (error) {
    data = null;
    return <div> data unavailable</div>;
    //console.log("error fetch checkout data", error);
  }
  // return <div>hello</div>;
  return data ? (
    <Checkout CheckoutSession={data} />
  ) : (
    <div> data unavailable</div>
  );
}

export default page;
