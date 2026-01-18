"use client";

import Link from "next/link";
import {
  CheckBadgeIcon,
  HeartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function AboutUsClient() {
  return (
    <div className="bg-background-light-secondary dark:bg-background-dark font-display text-[#181611] dark:text-gray-200">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <main className="layout-container flex h-full grow flex-col">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-transparent dark:from-primary/30 dark:via-primary/20 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {/* Breadcrumbs */}
              <div className="flex flex-wrap gap-2 mb-8">
                <Link
                  className="text-[#897f61] dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors"
                  href="/home"
                >
                  Trang chủ
                </Link>
                <span className="text-[#897f61] dark:text-gray-400 text-sm font-medium leading-normal">
                  /
                </span>
                <span className="text-[#181611] dark:text-gray-200 text-sm font-medium leading-normal">
                  Về Chúng Tôi
                </span>
              </div>

              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6 text-[#181611] dark:text-gray-100">
                  Yến Sào Tinh Hoa
                </h1>
                <p className="text-xl md:text-2xl text-[#897f61] dark:text-gray-400 font-medium mb-4">
                  Hơn 10 Năm Đồng Hành Cùng Sức Khỏe Gia Đình Việt
                </p>
                <p className="text-lg text-[#181611] dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  Chúng tôi tự hào là thương hiệu yến sào uy tín, chuyên cung
                  cấp những sản phẩm yến sào nguyên chất, đảm bảo chất lượng cao
                  nhất từ nguồn gốc Khánh Hòa.
                </p>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black mb-6 text-[#181611] dark:text-gray-100">
                      Câu Chuyện Của Chúng Tôi
                    </h2>
                    <div className="space-y-4 text-[#181611] dark:text-gray-300 text-base leading-relaxed">
                      <p>
                        Yến Sào Tinh Hoa được thành lập với sứ mệnh mang đến
                        những sản phẩm yến sào chất lượng cao nhất cho người
                        tiêu dùng Việt Nam. Với hơn 8 năm kinh nghiệm trong
                        ngành, chúng tôi đã xây dựng được mạng lưới đối tác tin
                        cậy tại Khánh Hòa - vùng đất nổi tiếng với những tổ yến
                        chất lượng hàng đầu.
                      </p>
                      <p>
                        Từ những ngày đầu, chúng tôi đã đặt chất lượng và uy tín
                        lên hàng đầu. Mỗi sản phẩm đều được kiểm tra nghiêm
                        ngặt, đảm bảo 100% nguyên chất, không pha trộn, không sử
                        dụng hóa chất độc hại.
                      </p>
                      <p>
                        Chúng tôi tin rằng sức khỏe là tài sản quý giá nhất, và
                        yến sào chính là món quà từ thiên nhiên giúp bồi bổ sức
                        khỏe, tăng cường sức đề kháng cho cả gia đình.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 p-8 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl md:text-7xl font-black text-primary mb-4">
                          8+
                        </div>
                        <p className="text-xl font-bold text-[#181611] dark:text-gray-100">
                          Năm Kinh Nghiệm
                        </p>
                        <p className="text-[#897f61] dark:text-gray-400 mt-2">
                          Phục vụ hàng nghìn khách hàng
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 md:py-24 bg-white dark:bg-background-dark/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#181611] dark:text-gray-100">
                    Giá Trị Cốt Lõi
                  </h2>
                  <p className="text-lg text-[#897f61] dark:text-gray-400 max-w-2xl mx-auto">
                    Những giá trị định hướng mọi hoạt động của chúng tôi
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  <div className="bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent rounded-xl p-6 border border-primary/20 dark:border-primary/30">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center mb-4">
                      <ShieldCheckIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[#181611] dark:text-gray-100">
                      Chất Lượng
                    </h3>
                    <p className="text-[#897f61] dark:text-gray-400 text-sm leading-relaxed">
                      Cam kết 100% yến sào nguyên chất, không pha trộn, đảm bảo
                      an toàn vệ sinh thực phẩm.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent rounded-xl p-6 border border-primary/20 dark:border-primary/30">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center mb-4">
                      <HeartIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[#181611] dark:text-gray-100">
                      Tận Tâm
                    </h3>
                    <p className="text-[#897f61] dark:text-gray-400 text-sm leading-relaxed">
                      Đặt sức khỏe và sự hài lòng của khách hàng lên hàng đầu
                      trong mọi quyết định.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent rounded-xl p-6 border border-primary/20 dark:border-primary/30">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center mb-4">
                      <CheckBadgeIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[#181611] dark:text-gray-100">
                      Uy Tín
                    </h3>
                    <p className="text-[#897f61] dark:text-gray-400 text-sm leading-relaxed">
                      Xây dựng niềm tin qua từng sản phẩm, minh bạch về nguồn
                      gốc và quy trình sản xuất.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent rounded-xl p-6 border border-primary/20 dark:border-primary/30">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center mb-4">
                      <SparklesIcon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[#181611] dark:text-gray-100">
                      Đổi Mới
                    </h3>
                    <p className="text-[#897f61] dark:text-gray-400 text-sm leading-relaxed">
                      Không ngừng cải tiến quy trình, đa dạng hóa sản phẩm để
                      phục vụ tốt hơn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                  <div className="bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent rounded-2xl p-8 border border-primary/20 dark:border-primary/30">
                    <h3 className="text-2xl md:text-3xl font-black mb-4 text-[#181611] dark:text-gray-100">
                      Sứ Mệnh
                    </h3>
                    <p className="text-[#181611] dark:text-gray-300 leading-relaxed">
                      Mang đến những sản phẩm yến sào chất lượng cao nhất, góp
                      phần nâng cao sức khỏe và chất lượng cuộc sống cho mọi gia
                      đình Việt Nam. Chúng tôi cam kết duy trì tiêu chuẩn chất
                      lượng nghiêm ngặt và phục vụ khách hàng với sự tận tâm và
                      chuyên nghiệp.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent rounded-2xl p-8 border border-primary/20 dark:border-primary/30">
                    <h3 className="text-2xl md:text-3xl font-black mb-4 text-[#181611] dark:text-gray-100">
                      Tầm Nhìn
                    </h3>
                    <p className="text-[#181611] dark:text-gray-300 leading-relaxed">
                      Trở thành thương hiệu yến sào hàng đầu Việt Nam, được tin
                      tưởng và yêu mến bởi hàng triệu gia đình. Chúng tôi hướng
                      đến việc mở rộng thị trường, phát triển các sản phẩm mới
                      và đóng góp tích cực vào sự phát triển của ngành yến sào
                      Việt Nam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact & Map Section */}
          <section className="py-16 md:py-24 bg-white dark:bg-background-dark/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black mb-4 text-[#181611] dark:text-gray-100">
                    Liên Hệ Với Chúng Tôi
                  </h2>
                  <p className="text-lg text-[#897f61] dark:text-gray-400">
                    Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Contact Info */}
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                        <MapPinIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-[#181611] dark:text-gray-100">
                          Địa Chỉ
                        </h3>
                        <h5 className="font-bold text-lg mb-2 text-[#181611] dark:text-gray-100">
                          Chi nhánh 1
                        </h5>
                        <p className="text-[#897f61] dark:text-gray-400">
                          Khu đô thị Vạn Phúc, Quận Thủ Đức, Hồ Chí Minh
                        </p>
                        <h5 className="font-bold text-lg mb-2 text-[#181611] dark:text-gray-100">
                          Chi nhánh 2
                        </h5>
                        <p className="text-[#897f61] dark:text-gray-400">
                          Chung cư Hoàng Anh goldhouse, 187a, Lê Văn Lương, Hồ
                          Chí Minh
                        </p>
                        <h5 className="font-bold text-lg mb-2 text-[#181611] dark:text-gray-100">
                          Chi nhánh 3 - Nhà Yến
                        </h5>
                        <p className="text-[#897f61] dark:text-gray-400">
                          xã Trừ Văn Thố, Hồ Chí Minh
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                        <PhoneIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-[#181611] dark:text-gray-100">
                          Hotline
                        </h3>
                        <p className="text-[#897f61] dark:text-gray-400">
                          <a
                            href="tel:0792207233"
                            className="hover:text-primary transition-colors"
                          >
                            0792207233
                          </a>
                          <br />
                          <a
                            href="tel:0373191355"
                            className="hover:text-primary transition-colors"
                          >
                            0373191355
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                        <EnvelopeIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-[#181611] dark:text-gray-100">
                          Email
                        </h3>
                        <p className="text-[#897f61] dark:text-gray-400">
                          <a
                            href="mailto:info@yensaotinhhoa.com"
                            className="hover:text-primary transition-colors"
                          >
                            info@yensaotinhhoa.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0">
                        <ClockIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-[#181611] dark:text-gray-100">
                          Giờ Làm Việc
                        </h3>
                        <p className="text-[#897f61] dark:text-gray-400">
                          Thứ 2 - Chủ Nhật: 8:00 - 20:00
                          <br />
                          (Làm việc cả ngày lễ)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="rounded-xl overflow-hidden border border-[#e6e3db] dark:border-[#3a3321] shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7823.538916236204!2d106.6358594856998!3d11.35154261571201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174b1a8c605ba8d%3A0x96f9e02b8796cd1f!2zWeG6v24gc8OgbyBQaMaw4bujbmcgQsaw4budbmc!5e0!3m2!1svi!2s!4v1765813449816!5m2!1svi!2s"
                      // src="https://www.google.com/maps/embed?pb=!3m2!1svi!2s!4v1765817492175!5m2!1svi!2s!6m8!1m7!1suK5IjixdPcdPAsyKe0UeLQ!2m2!1d11.35221264964457!2d106.636453585235!3f203.53436044300852!4f-12.665019491456619!5f0.7820865974627469"
                      width="100%"
                      height="100%"
                      style={{ minHeight: "400px", border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Địa chỉ Yến Sào Tinh Hoa"
                      className="w-full"
                    />
                    {/* <iframe 
                    src="https://www.google.com/maps/embed?pb=!3m2!1svi!2s!4v1765817492175!5m2!1svi!2s!6m8!1m7!1suK5IjixdPcdPAsyKe0UeLQ!2m2!1d11.35221264964457!2d106.636453585235!3f203.53436044300852!4f-12.665019491456619!5f0.7820865974627469"
                     width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                    {/* <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7823.538916236204!2d106.6358594856998!3d11.35154261571201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174b1a8c605ba8d%3A0x96f9e02b8796cd1f!2zWeG6v24gc8OgbyBQaMaw4bujbmcgQsaw4budbmc!5e0!3m2!1svi!2s!4v1765813449816!5m2!1svi!2s"
                      width="600"
                      height="450"
                      style="border:0;"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-16 md:py-24 bg-white dark:bg-background-dark/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="w-full">
                  <iframe
                    //src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7823.538916236204!2d106.6358594856998!3d11.35154261571201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174b1a8c605ba8d%3A0x96f9e02b8796cd1f!2zWeG6v24gc8OgbyBQaMaw4bujbmcgQsaw4budbmc!5e0!3m2!1svi!2s!4v1765813449816!5m2!1svi!2s"
                    src="https://www.google.com/maps/embed?pb=!3m2!1svi!2s!4v1765817492175!5m2!1svi!2s!6m8!1m7!1suK5IjixdPcdPAsyKe0UeLQ!2m2!1d11.35221264964457!2d106.636453585235!3f203.53436044300852!4f-12.665019491456619!5f0.7820865974627469"
                    width="100%"
                    // max-height="600px"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Địa chỉ Yến Sào Tinh Hoa"
                    className="w-full h-[600px]"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
