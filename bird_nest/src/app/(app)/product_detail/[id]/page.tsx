import ProductDetailPage from "@/component/DetailPage/ProductDetailPage";

async function page(params: { params: Promise<{ id: string }> }) {
  const id = (await params.params).id;
  console.log(id, "id nè");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/products/detail_product/${id}`
    );
    const data = await res.json();
    console.log(data);
    if (data.product && data.product.length > 0) {
      return <ProductDetailPage product={data.product} />;
    } else {
      return <div> Vui lòng reload web</div>;
    }
  } catch (error) {
    return <div> Vui lòng reload web</div>;
    console.log(error);
  }
}

export default page;
