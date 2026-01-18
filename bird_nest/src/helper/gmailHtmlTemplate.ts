import React from "react";
import { CustomOrderTypeFull } from "@/types";

function gmailHtmlTemplate({
  order,
  name,
}: {
  order: CustomOrderTypeFull;
  name: string;
}) {
  const html = `
  <div style="background:#f4f6f8;padding:24px;font-family:Arial,Helvetica,sans-serif">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;overflow:hidden">

      <!-- HEADER -->
      <tr>
        <td style="background:#7a1f1f;color:#ffffff;padding:20px;text-align:center">
          <h1 style="margin:0;font-size:22px">YẾN SÀO NHÀ THẢO</h1>
          <p style="margin:4px 0 0;font-size:14px">Xác nhận đơn hàng</p>
        </td>
      </tr>

      <!-- BODY -->
      <tr>
        <td style="padding:20px">
          <p style="font-size:15px;margin:0 0 12px">
            Xin chào <strong>${name}</strong>,
          </p>
          <p style="font-size:14px;margin:0 0 16px;color:#555">
            Cảm ơn bạn đã đặt hàng. Đơn hàng <strong>#${
              order.id
            }</strong> của bạn đã được ghi nhận.
          </p>

          <!-- CUSTOMER INFO -->
          <table width="100%" style="border-collapse:collapse;margin-bottom:20px">
            <tr>
              <td style="font-size:14px;padding:6px 0"><strong>📞 Số điện thoại:</strong> ${
                order.phone
              }</td>
            </tr>
            <tr>
              <td style="font-size:14px;padding:6px 0"><strong>📍 Địa chỉ:</strong> ${
                order.address
              }</td>
            </tr>
          </table>

          <!-- PRODUCT LIST -->
          <h3 style="font-size:16px;margin:0 0 10px">🛒 Sản phẩm</h3>

          ${order.OrderItems.map(
            (item) => `
            <table width="100%" style="border-collapse:collapse;margin-bottom:12px">
              <tr>
                <td width="80">
                  <img src="${item.product.imageUrlThumb}" alt="${
              item.product.name
            }" style="width:70px;height:70px;object-fit:cover;border-radius:6px;border:1px solid #eee"/>
                </td>
                <td style="padding-left:10px;font-size:14px">
                  <div style="font-weight:bold">${item.product.name}</div>
                  <div style="color:#777;font-size:13px">
                    Số lượng: ${item.quantity}
                  </div>
                </td>
                <td style="text-align:right;font-size:14px;font-weight:bold">
                  ${item.total.toLocaleString("vi-VN")}₫
                </td>
              </tr>
            </table>
          `
          ).join("")}

          <!-- TOTAL -->
          <table width="100%" style="border-top:1px solid #eee;margin-top:16px;padding-top:12px">
            <tr>
              <td style="font-size:16px;font-weight:bold">Tổng cộng</td>
              <td style="text-align:right;font-size:18px;font-weight:bold;color:#7a1f1f">
                ${order.totalPrice.toLocaleString("vi-VN")}₫
              </td>
            </tr>
          </table>

          <p style="font-size:13px;color:#777;margin-top:20px">
            Chúng tôi sẽ liên hệ với bạn sớm để xác nhận và giao hàng.
          </p>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="background:#fafafa;padding:16px;text-align:center;font-size:12px;color:#999">
          © ${new Date().getFullYear()} Yến Sào Nhà Thảo<br/>
          Hotline: 0909 123 456
        </td>
      </tr>

    </table>
  </div>
  `;
  //   const html = ``;
  return html;
}

export default gmailHtmlTemplate;
