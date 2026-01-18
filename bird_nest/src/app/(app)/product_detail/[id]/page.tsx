import ProductDetailPage from "@/component/DetailPage/ProductDetailPage";

async function page(params: { params: Promise<{ id: string }> }) {
  const id = (await params.params).id;
  console.log(id, "id nè");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/products/detail_product/${id}`
  );
  const data = await res.json();
  console.log(data);

  return <ProductDetailPage product={data.product} />;
}

export default page;
