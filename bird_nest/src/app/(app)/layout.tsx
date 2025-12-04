import Header from "@/component/Header";
import Footer from "@/component/Home/Footer";

export default async function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      {/* <!-- Footer --> */}
      <Footer />
    </div>
  );
}
