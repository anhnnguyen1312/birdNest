"use client";

import { CheckoutSession, CheckoutItem } from "@/types";
import { useState, useMemo, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import fetchWithAuth from "@/helper/fetchWithAuth";
// import CheckoutForm from "../Stripe/CheckoutForm";

interface FormData {
  email: string;
  // fullname: string;
  phone: string;
  address: string;
  province: string;
  ward: string;
  // shippingMethod: "fast" | "standard";
  paymentMethod: "cod" | "bank" | "ewallet" | "stripe";
  // saveInfo: boolean;
}

interface FormErrors {
  email?: string;
  // fullname?: string;
  phone?: string;
  address?: string;
  province?: string;
  ward?: string;
}
interface Ward {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
}

interface DataProvince {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  phone_code: number;
  wards: Ward[];
}
export default function Checkout({
  CheckoutSession,
}: {
  CheckoutSession: CheckoutSession;
}) {
  const { user } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    address: "",
    province: "",
    ward: "",
    paymentMethod: "stripe",
    //saveInfo: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowstripeForm, setIsShowStripeForm] = useState(false);

  const [province, setProvince] = useState<DataProvince[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  console.log("CheckoutSession", CheckoutSession);
  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const res = await fetch(
          "https://provinces.open-api.vn/api/v2/?depth=2"
        );
        const data = await res.json();
        if (data && data.length > 0) {
          setProvince(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProvince();
  }, []);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Vietnamese phone format: 10-11 digits, starting with 0 or +84
    const phoneRegex = /^(0|\+84)[3-9]\d{8,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // // Fullname validation
    // if (!formData.fullname.trim()) {
    //   newErrors.fullname = "Họ và tên là bắt buộc";
    // }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (VD: 0912345678)";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ là bắt buộc";
    }

    // Province validation
    if (!formData.province || formData.province === "Chọn Tỉnh/Thành") {
      newErrors.province = "Vui lòng chọn Tỉnh/Thành phố";
    }

    // // District validation
    // if (!formData.district || formData.district === "Chọn Quận/Huyện") {
    //   newErrors.district = "Vui lòng chọn Quận/Huyện";
    // }

    // // Ward validation
    if (!formData.ward || formData.ward === "Chọn Phường/Xã") {
      newErrors.ward = "Vui lòng chọn Phường/Xã";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    // setFormData((prev) => ({
    //   ...prev,
    //   [name]: type === "checkbox" ? checked : value,
    // }));
    if (name === "province") {
      setSelectedProvince(value);
      setFormData((prev) => ({
        ...prev,
        province: value,
        ward: "", // Only accept string type as province, don't use checkbox logic
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    // }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const filterWard = useMemo(() => {
    if (selectedProvince) {
      const selectedProvinceData = province.find(
        (item) => item.name === selectedProvince
      );

      return selectedProvinceData?.wards || [];
    }
  }, [selectedProvince, province]);

  const handleRadioChange = (name: keyof FormData, value: string) => {
    if ((value = "stripe")) {
      setIsShowStripeForm(true);
    } else {
      setIsShowStripeForm(false);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const priceItemsCal = (item: CheckoutItem) => {
    // Với CheckoutSession, giá đã được tính và lưu trong priceSnapshot
    return Number(item.totalprice);
  };

  // Use checkout session data directly
  const orderSummary = useMemo(() => {
    return {
      subtotal: CheckoutSession.subtotal,
      shippingFee: CheckoutSession.shippingFee,
      discount: CheckoutSession.discount,
      total: CheckoutSession.totalPrice,
      totalQuantity: CheckoutSession.id
        ? CheckoutSession?.items?.reduce((sum, item) => sum + item.quantity, 0)
        : 0,
    };
  }, [CheckoutSession]);

  // Format currency VND
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!CheckoutSession.items || CheckoutSession.items.length === 0) {
      alert("Checkout session không có sản phẩm nào");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build full address
      const fullAddress = `${formData.address}, ${formData.ward}, ${formData.province}`;

      // Build items array
      const items = CheckoutSession.items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price: Number(item.priceSnapshot),
      }));

      // Prepare order data
      const orderData = {
        name: user?.username,
        userId: user?.id,
        email: formData.email,
        phone: formData.phone,
        address: fullAddress,
        paymentMethod: formData.paymentMethod,
        totalPrice: CheckoutSession.totalPrice,
        totalQuantity: orderSummary.totalQuantity,
        items: items,
      };
      // POST to API

      const response = await fetchWithAuth("/api/orders/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok && result.error === 0) {
        // Success - redirect or show success message

        alert("Đặt hàng thành công!");
        if (formData.paymentMethod === "stripe") {
          router.push(`/payment-intent-stripe`);
        } else {
          router.push(`/payment/${result.orderId}`);
        }

        // You can redirect here: window.location.href = "/order-success";
      } else {
        alert(result.message || "Có lỗi xảy ra khi đặt hàng");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
        <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <main className="grow">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-x-12">
                {/* <!-- Left Column --> */}
                <div className="lg:col-span-6">
                  <div className="flex flex-wrap items-center gap-2 mb-8">
                    <a
                      className="text-gray-500 dark:text-gray-400 text-sm font-medium"
                      href="#"
                    >
                      Giỏ hàng
                    </a>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      /
                    </span>
                    <span className="text-text-light dark:text-text-dark text-sm font-bold">
                      Thông tin
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      /
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      Hoàn tất
                    </span>
                  </div>
                  <h2 className="text-text-light dark:text-text-dark text-3xl font-extrabold leading-tight tracking-tight mb-8">
                    Thông tin thanh toán
                  </h2>
                  {/* <!-- Delivery InhtmlFormation --> */}
                  <section className="mb-10">
                    <h3 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight tracking-[-0.015em] mb-4">
                      Thông tin giao hàng
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col min-w-40 flex-1">
                        <label
                          className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className={`htmlForm-input py-2 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border ${
                            errors.email
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } bg-white dark:bg-background-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-base font-normal`}
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Nhập địa chỉ email của bạn"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* <div className="flex flex-col min-w-40 flex-1">
                          <label
                            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2"
                            htmlFor="fullname"
                          >
                            Họ và tên
                          </label>
                          <input
                            className={`htmlForm-input  py-2 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border ${
                              errors.fullname
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            } bg-white dark:bg-background-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-base font-normal`}
                            id="fullname"
                            name="fullname"
                            placeholder="Nhập họ và tên"
                            value={formData.fullname}
                            onChange={handleInputChange}
                          />
                          {errors.fullname && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.fullname}
                            </p>
                          )}
                        </div> */}
                        <div className="flex flex-col min-w-40 flex-1">
                          <label
                            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2"
                            htmlFor="phone"
                          >
                            Số điện thoại
                          </label>
                          <input
                            className={`htmlForm-input  py-2 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border ${
                              errors.phone
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            } bg-white dark:bg-background-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-base font-normal`}
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Nhập số điện thoại (VD: 0912345678)"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col min-w-40 flex-1">
                        <label
                          className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2"
                          htmlFor="address"
                        >
                          Địa chỉ
                        </label>
                        <input
                          className={`htmlForm-input  py-2 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border ${
                            errors.address
                              ? "border-red-500 dark:border-red-500"
                              : "border-gray-300 dark:border-gray-600"
                          } bg-white dark:bg-background-dark focus:border-primary h-12 placeholder:text-gray-400 px-4 text-base font-normal`}
                          id="address"
                          name="address"
                          placeholder="Số nhà, tên đường"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.address}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col min-w-40 flex-1">
                          <label
                            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2"
                            htmlFor="province"
                          >
                            Tỉnh/Thành phố
                          </label>
                          <select
                            className={`htmlForm-select py-2 flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border ${
                              errors.province
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            } bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-base font-normal`}
                            id="province"
                            name="province"
                            value={formData.province}
                            onChange={handleInputChange}
                          >
                            {/* <option>Chọn Tỉnh/Thành</option>
                            <option>Hà Nội</option>
                            <option>TP. Hồ Chí Minh</option>
                            <option>Đà Nẵng</option> */}
                            <option value="">Chọn Tỉnh / Thành</option>

                            {province.length > 0 &&
                              province.map((item, id) => {
                                return (
                                  <option key={id} value={item.name}>
                                    {item.name}
                                  </option>
                                );
                              })}
                          </select>
                          {errors.province && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.province}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col min-w-40 flex-1">
                          <label
                            className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2"
                            htmlFor="ward"
                          >
                            Phường/Xã
                          </label>
                          <select
                            className={`htmlForm-select py-2 flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border ${
                              errors.ward
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                            } bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-base font-normal`}
                            id="ward"
                            name="ward"
                            value={formData.ward}
                            onChange={handleInputChange}
                          >
                            <option>Chọn Phường/Xã</option>
                            {/* {province && selectedProvince &&
                              province.map((item, id) => {
                                return (
                                  <option key={id} value={item.name}>
                                    {item.name === selectedProvince && item.name:}
                                  </option>
                                );
                              })} */}
                            {filterWard?.map((item, id) => {
                              return (
                                <option key={id} value={item.name}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                          {errors.ward && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.ward}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* <div className="flex items-center">
                        <input
                          className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
                          id="save-info"
                          name="saveInfo"
                          type="checkbox"
                          checked={formData.saveInfo}
                          onChange={handleInputChange}
                        />
                        <label
                          className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                          htmlFor="save-info"
                        >
                          Lưu thông tin cho lần mua hàng sau
                        </label>
                                                    ? "border-primary bg-primary/10 dark:bg-primary/20"

                                                     ? "text-text-light dark:text-text-dark"

                     </div> */}
                    </div>
                  </section>
                  {/* <!-- Shipping Method --> */}
                  <section className="mb-10">
                    <h3 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight tracking-[-0.015em] mb-4">
                      Phương thức vận chuyển
                    </h3>
                    <div className="space-y-3">
                      <label
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors 
                            border-gray-300 dark:border-gray-600 hover:border-primary
                        `}
                      >
                        <div className="flex items-center gap-3">
                          {/* <input
                            checked={formData.shippingMethod === "fast"}
                            onChange={() =>
                              handleRadioChange("shippingMethod", "fast")
                            }
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                            name="shipping"
                            type="radio"
                          /> */}
                          <span
                            className={`text-sm font-semibold
                                text-gray-700 dark:text-gray-300
                            `}
                          >
                            Giao hàng nhanh
                          </span>
                        </div>
                        <span
                          className={`text-sm font-bold 
                              text-gray-700 dark:text-gray-300
                          `}
                        >
                          {formatCurrency(40000)}
                        </span>
                      </label>
                      {/* <label
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.shippingMethod === "standard"
                            ? "border-primary bg-primary/10 dark:bg-primary/20"
                            : "border-gray-300 dark:border-gray-600 hover:border-primary"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            checked={formData.shippingMethod === "standard"}
                            onChange={() =>
                              handleRadioChange("shippingMethod", "standard")
                            }
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                            name="shipping"
                            type="radio"
                          />
                          <span
                            className={`text-sm font-semibold ${
                              formData.shippingMethod === "standard"
                                ? "text-text-light dark:text-text-dark"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            Giao hàng tiêu chuẩn
                          </span>
                        </div>
                        <span
                          className={`text-sm font-bold ${
                            formData.shippingMethod === "standard"
                              ? "text-text-light dark:text-text-dark"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {formatCurrency(25000)}
                        </span>
                      </label> */}
                    </div>
                  </section>
                  {/* <!-- Payment Method --> */}
                  <section>
                    <h3 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight tracking-[-0.015em] mb-4">
                      Phương thức thanh toán
                    </h3>
                    <div className="space-y-3">
                      <div
                        className={`border rounded-lg transition-colors ${
                          formData.paymentMethod === "stripe"
                            ? "border-primary bg-primary/10 dark:bg-primary/20"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        <label className="flex items-center p-4 cursor-pointer">
                          <input
                            checked={formData.paymentMethod === "stripe"}
                            onChange={() =>
                              handleRadioChange("paymentMethod", "stripe")
                            }
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                            name="payment"
                            type="radio"
                          />
                          <span className="ml-3 text-sm font-semibold text-text-light dark:text-text-dark">
                            Thanh toán stripe
                          </span>
                        </label>
                      </div>
                      {/* {isShowstripeForm ? <CheckoutForm orderId={0} /> : null} */}
                      <div
                        className={`border rounded-lg transition-colors ${
                          formData.paymentMethod === "cod"
                            ? "border-primary bg-primary/10 dark:bg-primary/20"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        <label className="flex items-center p-4 cursor-pointer">
                          <input
                            checked={formData.paymentMethod === "cod"}
                            onChange={() =>
                              handleRadioChange("paymentMethod", "cod")
                            }
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                            name="payment"
                            type="radio"
                          />
                          <span className="ml-3 text-sm font-semibold text-text-light dark:text-text-dark">
                            Thanh toán khi nhận hàng (COD)
                          </span>
                        </label>
                      </div>
                      <div
                        className={`border rounded-lg transition-colors ${
                          formData.paymentMethod === "bank"
                            ? "border-primary bg-primary/10 dark:bg-primary/20"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        <label className="flex items-center p-4 cursor-pointer">
                          <input
                            checked={formData.paymentMethod === "bank"}
                            onChange={() =>
                              handleRadioChange("paymentMethod", "bank")
                            }
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                            name="payment"
                            type="radio"
                          />
                          <span className="ml-3 text-sm font-semibold text-text-light dark:text-text-dark">
                            Chuyển khoản ngân hàng
                          </span>
                        </label>
                      </div>
                      <div
                        className={`border rounded-lg transition-colors ${
                          formData.paymentMethod === "ewallet"
                            ? "border-primary bg-primary/10 dark:bg-primary/20"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        <label className="flex items-center p-4 cursor-pointer">
                          <input
                            checked={formData.paymentMethod === "ewallet"}
                            onChange={() =>
                              handleRadioChange("paymentMethod", "ewallet")
                            }
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                            name="payment"
                            type="radio"
                          />
                          <span className="ml-3 text-sm font-semibold text-text-light dark:text-text-dark">
                            Ví điện tử (Momo, ZaloPay)
                          </span>
                        </label>
                        {formData.paymentMethod === "ewallet" && (
                          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Sau khi hoàn tất đơn hàng, hệ thống sẽ hiển thị mã
                              QR để bạn quét và thanh toán.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                </div>
                {/* <!-- Right Column - Order Summary --> */}
                <div className="lg:col-span-4 mt-10 lg:mt-0">
                  <div className="sticky top-28">
                    <div className="bg-white dark:bg-background-dark p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                      <h3 className="text-xl font-bold mb-6 text-text-light dark:text-text-dark">
                        Tóm tắt đơn hàng
                      </h3>
                      <div className="space-y-4">
                        {!CheckoutSession.items ||
                        CheckoutSession.items.length === 0 ? (
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                            Checkout session trống
                          </p>
                        ) : (
                          CheckoutSession.items.map((item) => {
                            const price = priceItemsCal(item);
                            const variantName =
                              item.ProductVariant?.variantName ||
                              item.ProductVariant?.weight ||
                              "";

                            return (
                              <div
                                key={item.id}
                                className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700"
                              >
                                <div className="relative">
                                  <img
                                    className="w-16 h-16 rounded-lg object-cover"
                                    alt={item.Product.name}
                                    src={item.Product.imageUrlThumb}
                                  />
                                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-accent rounded-full">
                                    {item.quantity}
                                  </span>
                                </div>
                                <div className="grow flex flex-col">
                                  <p className="font-semibold text-sm text-text-light dark:text-text-dark">
                                    {item.Product.name}
                                  </p>
                                  {variantName && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      {variantName}
                                    </p>
                                  )}
                                </div>
                                <div className="text-right flex align-top flex-col">
                                  <p className="font-semibold text-sm text-text-light dark:text-text-dark">
                                    {formatCurrency(price)}
                                  </p>
                                  <p className="font-semibold text-sm text-text-light dark:text-text-dark">
                                    X {item.quantity}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                      <div className="py-6 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Tạm tính
                          </span>
                          <span className="font-medium text-text-light dark:text-text-dark">
                            {formatCurrency(orderSummary.subtotal)}
                          </span>
                        </div>
                        {orderSummary.discount > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              Giảm giá
                            </span>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              -{formatCurrency(orderSummary.discount)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Phí vận chuyển
                          </span>
                          <span className="font-medium text-text-light dark:text-text-dark">
                            {formatCurrency(orderSummary.shippingFee)}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-base font-bold text-text-light dark:text-text-dark">
                          Tổng cộng
                        </span>
                        <span className="text-xl font-bold text-accent">
                          {formatCurrency(orderSummary.total)}
                        </span>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="mt-8">
                          <button
                            type="submit"
                            disabled={
                              !CheckoutSession.items ||
                              CheckoutSession.items.length === 0 ||
                              isSubmitting
                            }
                            className={`flex w-full items-center justify-center overflow-hidden rounded-lg h-12 gap-2 text-base font-bold leading-normal tracking-wide min-w-0 px-6 transition-colors ${
                              !CheckoutSession.items ||
                              CheckoutSession.items.length === 0 ||
                              isSubmitting
                                ? "bg-background-dark text-gray-200 cursor-not-allowed"
                                : "bg-background-dark text-white hover:bg-accent/90 cursor-pointer"
                            }`}
                          >
                            <span>
                              {isSubmitting
                                ? "Đang xử lý..."
                                : "Hoàn tất Đơn hàng"}
                            </span>
                            {!isSubmitting && (
                              // <span className="material-symbols-outlined">
                              //   arrow_htmlForward
                              // </span>
                              <CurrencyDollarIcon className="w-6 h-6" />
                            )}
                          </button>
                          <div className="flex items-center justify-center gap-2 mt-4">
                            <span className="material-symbols-outlined text-sm text-gray-500">
                              lock
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Thông tin của bạn được bảo mật an toàn
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
