import React from "react";
import ProductsPageClient from "@/component/ProductPage/ProductsPageClient";
// import { getAllProducts } from "@/lib/products";
import { Product } from "@/types";
export const dynamic = "force-static";
export const revalidate = 1800; // Tái tạo lại sau mỗi 30 phút

export const metadata = {
  title: "Sản Phẩm Yến Sào | Bird Nest",
  description:
    "Khám phá bộ sưu tập yến sào cao cấp, đảm bảo chất lượng và an toàn",
  keywords: [
    "yến sào",
    "sản phẩm yến sào",
    "yến thô",
    "yến tinh chế",
    "quà tặng yến sào",
    "yến chưng",
    "yến baby",
    "quà biếu sức khỏe",
    "bird nest",
  ],
  openGraph: {
    title: "Sản Phẩm Yến Sào | Bird Nest",
    description:
      "Bộ sưu tập sản phẩm yến sào Bird Nest cao cấp hỗ trợ tăng cường sức khỏe, bổ dưỡng, phù hợp làm quà tặng.",
    url: "https://birdnest.vn/san-pham",
    type: "website",
    images: [
      {
        url: "https://birdnest.vn/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sản phẩm yến sào Bird Nest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sản Phẩm Yến Sào | Bird Nest",
    description:
      "Khám phá các dòng sản phẩm yến sào chất lượng cao từ Bird Nest, tốt cho sức khỏe.",
    images: ["https://birdnest.vn/og-image.jpg"],
  },
};

async function page() {
  // Fetch products từ server để cải thiện SEO
  let products: Product[] = [];

  try {
    // products = await getAllProducts();
    const res = await fetch("http://localhost:3000/api/products/all_products");

    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    const data = await res.json();
    products = data.products;
    console.log("data", data);
  } catch (error) {
    console.error("Error fetching products in server component:", error);
    // Nếu lỗi, products sẽ là mảng rỗng, client component sẽ handle fallback
  }

  return <ProductsPageClient initialProducts={products} />;
}

export default page;
