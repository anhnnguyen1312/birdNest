import CTA from "@/component/LandingPage/CTA";
import Feature from "@/component/LandingPage/Feature";
import Footer from "@/component/LandingPage/Footer";
import Hero from "@/component/LandingPage/Hero";
import Promotion from "@/component/LandingPage/Promotion";
import Testimonials from "@/component/LandingPage/Testimonials";
import { FeaturedProduct } from "@/types";

export default async function Home() {
  let topProducts: FeaturedProduct | null = null;

  try {
    const res = await fetch("http://localhost:3000/api/products/top_products");

    if (!res.ok) {
      console.error(
        "Failed to fetch top products. Status:",
        res.status,
        res.statusText
      );
    } else {
      const data = await res.json();
      topProducts = data.hotProducts[0];
    }
  } catch (error) {
    console.error("Error fetching top products:", error);
  }

  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
        <div className="relative flex h-auto w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            {/* <!-- Hero Section --> */}
            <Hero />
            {/* <!-- Feature Section --> */}
            <Feature />

            {topProducts && <Promotion topProducts={topProducts} />}
            {/* <!-- Testimonials Section --> */}
            <Testimonials />
            {/* <!-- Final CTA Section --> */}
            <CTA />
            {/* <!-- Footer --> */}

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
