"use client";
import Breadcrumbs from "@/component/Breadcrumbs";
import ImageGallery from "@/component/DetailPage/ImageGallery";
import ProductDetail from "@/component/DetailPage/ProductDetail";
import InfoReview from "@/component/DetailPage/InfoReview";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function ProductDetailPage() {
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:3000/api/products/product_detail/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);
  return (
    <div className="font-display bg-background-light-secondary dark:bg-background-dark-product text-[#221d10] dark:text-[#f8f7f6]">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <main className="layout-container flex h-full grow flex-col">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="layout-content-container flex flex-col w-full">
              {/* <!-- Breadcrumbs Section --> */}
              <Breadcrumbs />
              {/* <!-- Main Product Section --> */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* <!-- Left Column: Image Gallery --> */}
                <ImageGallery />
                {/* <!-- Right Column: Product Details --> */}
                <ProductDetail />
              </div>
              {/* <!-- Detailed Info & Reviews Section --> */}
              <InfoReview />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductDetailPage;
