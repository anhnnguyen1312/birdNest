import Breadcrumbs from "@/component/Breadcrumbs";
import ImageGallery from "@/component/DetailPage/ImageGallery";
import ProductDetail from "@/component/DetailPage/ProductDetail";
import InfoReview from "@/component/DetailPage/InfoReview";
import CommentSection from "@/component/Comments/CommentSection";
import { Product } from "@/types";

function ProductDetailPage({ product }: { product: Product }) {
  console.log("product", product);
  return (
    <div className="font-display bg-background-light-secondary dark:bg-background-dark text-[#221d10] dark:text-[#f8f7f6]">
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
                {product && <ProductDetail product={product} />}
              </div>
              {/* <!-- Detailed Info & Reviews Section --> */}
              <InfoReview />
              {/* <!-- Comments Section --> */}
              {product && (
                <CommentSection productId={product.id} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductDetailPage;
