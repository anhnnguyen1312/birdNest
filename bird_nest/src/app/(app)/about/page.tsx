import type { Metadata } from "next";
import Link from "next/link";
import AboutUsClient from "@/component/AboutUs/AboutUsClient";
import BranchesMap from "@/component/AboutUs/BranchesMap";

export const metadata: Metadata = {
  title: "Về Chúng Tôi | Yến Sào Tinh Hoa - Chuyên Gia Yến Sào Cao Cấp",
  description:
    "Yến Sào Tinh Hoa - Thương hiệu yến sào uy tín với hơn 10 năm kinh nghiệm. Chuyên cung cấp yến sào nguyên chất, đảm bảo chất lượng từ Khánh Hòa. Cam kết mang đến sản phẩm tốt nhất cho sức khỏe gia đình bạn.",
  keywords: [
    "về chúng tôi",
    "yến sào tinh hoa",
    "công ty yến sào",
    "thương hiệu yến sào",
    "yến sào khánh hòa",
    "yến sào nguyên chất",
    "yến sào uy tín",
    "about us",
  ],
  openGraph: {
    title: "Về Chúng Tôi | Yến Sào Tinh Hoa",
    description:
      "Khám phá câu chuyện của Yến Sào Tinh Hoa - Thương hiệu yến sào uy tín với hơn 10 năm kinh nghiệm",
    url: "https://yensaotinhhoa.com/about",
    type: "website",
    images: [
      {
        url: "https://yensaotinhhoa.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Yến Sào Tinh Hoa - Về Chúng Tôi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Về Chúng Tôi | Yến Sào Tinh Hoa",
    description:
      "Thương hiệu yến sào uy tín với hơn 10 năm kinh nghiệm, chuyên cung cấp yến sào nguyên chất",
    images: ["https://yensaotinhhoa.com/og-about.jpg"],
  },
  alternates: {
    canonical: "https://yensaotinhhoa.com/about",
  },
};

export default function AboutUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Yến Sào Tinh Hoa",
            description:
              "Thương hiệu yến sào uy tín với hơn 10 năm kinh nghiệm, chuyên cung cấp yến sào nguyên chất từ Khánh Hòa",
            url: "https://yensaotinhhoa.com",
            logo: "https://yensaotinhhoa.com/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+84-1900-1234",
              contactType: "customer service",
              areaServed: "VN",
              availableLanguage: ["Vietnamese"],
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Đường ABC",
              addressLocality: "Thành phố Hồ Chí Minh",
              addressRegion: "Hồ Chí Minh",
              postalCode: "700000",
              addressCountry: "VN",
            },
            sameAs: [
              "https://www.facebook.com/yensaotinhhoa",
              "https://www.instagram.com/yensaotinhhoa",
            ],
          }),
        }}
      />
      <AboutUsClient />
      <BranchesMap />
    </>
  );
}
