import ImageGrid from "@/component/Home/ImageGrid";
import Feature from "@/component/Home/Feature";
import Hero from "@/component/Home/Hero";
import Promotion from "@/component/Home/Promotion";
import { FeaturedProduct } from "@/types";
// import fetchWithAuth from "@/helper/fetchWithAuth";

export default async function Home() {
  let fetchProducted: FeaturedProduct[] = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/products/hot_products`
    );
    const data = await response.json();
    fetchProducted = data.hotProducts;
  } catch (error) {
    console.error("Error fetching hot products:", error);
  }
  return (
    <div className="bg-background-light-home dark:bg-background-dark font-display text-[#181611] dark:text-background-light-home">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
              {/* <!-- HeroSection --> */}
              <Hero />
              {/* <!-- FeatureSection --> */}
              <Feature />
              {/* <!-- SectionHeader + ImageGrid --> */}
              {fetchProducted && fetchProducted.length > 0 && (
                <ImageGrid hotProducts={fetchProducted} />
              )}
              {/* <!-- Promotion Section --> */}
              <Promotion />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
