"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // ---- INSERT PRODUCTS ----

    await queryInterface.bulkInsert(
      "Products",
      [
        {
          id: 1,
          name: "Yến Sào Tinh Chế Loại I",
          category: "TINH_CHE",
          description:
            "Tổ yến tinh chế 100% nguyên chất, làm sạch kỹ, phù hợp chưng đường phèn.",
          gift: " Hộp quà sang trọng + thiệp chúc mừng + táo đỏ, kỷ tử, hạt sen, đường phèn",
          price: 3200000,
          discountPrice: 3050000,
          stock: 100,
          imageUrlThumb:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDeqaeY7NWEDfovuPxhRZazLkHMDYvFtx7EUIstw4xwhOCS1tHm3Z2kjOkmuNcW7vwzPg3hKfTm84Ef_0h-R2dQgP49t9ePScwMhEl8rQPMF8z_m7jcLSjyitKa4tDkouozZbN_lymo3q10uGoc08fWK8nv7lCuGT87EcLQ1AB5H5wnwbAp9ZYj6nFCpOZZNO3IbxrCMF5eOFEYlY9HB74TGNx62WXo6-BvhGQtk8HgdAjLsDrdVfpapUPSMfQWZkZrkWcmJDpDdAE",
          imageUrlArr: [
            "yen-tinh-che-1.jpg",
            "yen-tinh-che-2.jpg",
            "yen-tinh-che-3.jpg",
          ],
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 2,
          name: "Yến Sào Tinh Chế Loại II",
          category: "TINH_CHE",
          description:
            "Tổ yến tinh chế 100% nguyên chất, làm sạch kỹ, phù hợp chưng đường phèn.",
          gift: " Hộp quà sang trọng + thiệp chúc mừng + táo đỏ, kỷ tử, hạt sen, đường phèn",
          price: 2800000,
          discountPrice: 3050000,
          stock: 100,
          imageUrlThumb:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDeqaeY7NWEDfovuPxhRZazLkHMDYvFtx7EUIstw4xwhOCS1tHm3Z2kjOkmuNcW7vwzPg3hKfTm84Ef_0h-R2dQgP49t9ePScwMhEl8rQPMF8z_m7jcLSjyitKa4tDkouozZbN_lymo3q10uGoc08fWK8nv7lCuGT87EcLQ1AB5H5wnwbAp9ZYj6nFCpOZZNO3IbxrCMF5eOFEYlY9HB74TGNx62WXo6-BvhGQtk8HgdAjLsDrdVfpapUPSMfQWZkZrkWcmJDpDdAE",
          imageUrlArr: [
            "yen-tinh-che-1.jpg",
            "yen-tinh-che-2.jpg",
            "yen-tinh-che-3.jpg",
          ],
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 3,
          name: "Yến Vụn Tinh Chế",
          category: "TINH_CHE",
          description:
            "Tổ yến vụn tinh chế 100% nguyên chất, làm sạch kỹ, phù hợp chưng đường phèn.",
          gift: " Hộp quà sang trọng + thiệp chúc mừng + táo đỏ, kỷ tử, hạt sen, đường phèn",
          price: 2600000,
          discountPrice: 1000000,
          stock: 10,
          imageUrlThumb:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDeqaeY7NWEDfovuPxhRZazLkHMDYvFtx7EUIstw4xwhOCS1tHm3Z2kjOkmuNcW7vwzPg3hKfTm84Ef_0h-R2dQgP49t9ePScwMhEl8rQPMF8z_m7jcLSjyitKa4tDkouozZbN_lymo3q10uGoc08fWK8nv7lCuGT87EcLQ1AB5H5wnwbAp9ZYj6nFCpOZZNO3IbxrCMF5eOFEYlY9HB74TGNx62WXo6-BvhGQtk8HgdAjLsDrdVfpapUPSMfQWZkZrkWcmJDpDdAE",

          imageUrlArr: [
            "yen-tinh-che-1.jpg",
            "yen-tinh-che-2.jpg",
            "yen-tinh-che-3.jpg",
          ],
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 4,
          name: "Yến Baby",
          category: "BABY",
          description:
            "Tổ yến baby đã được làm sạch, thích hợp cho trẻ em và người mới dùng yến.",
          gift: "",

          price: 2700000,
          discountPrice: 1300000,
          stock: 80,
          imageUrlThumb:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDeqaeY7NWEDfovuPxhRZazLkHMDYvFtx7EUIstw4xwhOCS1tHm3Z2kjOkmuNcW7vwzPg3hKfTm84Ef_0h-R2dQgP49t9ePScwMhEl8rQPMF8z_m7jcLSjyitKa4tDkouozZbN_lymo3q10uGoc08fWK8nv7lCuGT87EcLQ1AB5H5wnwbAp9ZYj6nFCpOZZNO3IbxrCMF5eOFEYlY9HB74TGNx62WXo6-BvhGQtk8HgdAjLsDrdVfpapUPSMfQWZkZrkWcmJDpDdAE",

          imageUrlArr: ["yen-tho-1.jpg", "yen-tho-2.jpg"],
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 5,
          name: "Tổ yến rút lông nguyên tổ",
          category: "THO",
          description:
            "Tổ yến nguyên tổ, chưa qua tinh chế, giữ nguyên 100% dưỡng chất.",
          gift: " Hộp quà sang trọng + thiệp chúc mừng + dụng cụ nhặt lông yến",

          price: 1600000,
          discountPrice: 1300000,
          stock: 80,
          imageUrlThumb:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDeqaeY7NWEDfovuPxhRZazLkHMDYvFtx7EUIstw4xwhOCS1tHm3Z2kjOkmuNcW7vwzPg3hKfTm84Ef_0h-R2dQgP49t9ePScwMhEl8rQPMF8z_m7jcLSjyitKa4tDkouozZbN_lymo3q10uGoc08fWK8nv7lCuGT87EcLQ1AB5H5wnwbAp9ZYj6nFCpOZZNO3IbxrCMF5eOFEYlY9HB74TGNx62WXo6-BvhGQtk8HgdAjLsDrdVfpapUPSMfQWZkZrkWcmJDpDdAE",

          imageUrlArr: ["yen-tho-1.jpg", "yen-tho-2.jpg"],
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 6,
          name: "Chân yến",
          category: "THO",
          description:
            "Chân yến nguyên tổ, chưa qua tinh chế, tập trung nhiều dưỡng chất, chân yến chắc và dày hơn, phù hợp với người thích nhai chân yến.",
          gift: " dụng cụ nhặt lông yến",

          price: 2000000,
          discountPrice: 1300000,
          stock: 80,
          imageUrlThumb:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDeqaeY7NWEDfovuPxhRZazLkHMDYvFtx7EUIstw4xwhOCS1tHm3Z2kjOkmuNcW7vwzPg3hKfTm84Ef_0h-R2dQgP49t9ePScwMhEl8rQPMF8z_m7jcLSjyitKa4tDkouozZbN_lymo3q10uGoc08fWK8nv7lCuGT87EcLQ1AB5H5wnwbAp9ZYj6nFCpOZZNO3IbxrCMF5eOFEYlY9HB74TGNx62WXo6-BvhGQtk8HgdAjLsDrdVfpapUPSMfQWZkZrkWcmJDpDdAE",

          imageUrlArr: ["yen-tho-1.jpg", "yen-tho-2.jpg"],
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 7,
          name: "Nước Yến Chưng Sẵn",
          category: "Nước yến",
          description:
            "Nước yến chưng sẵn bao gồm đường phèn, hạt sen, kỷ tử, táo đỏ. bổ sung năng lượng, phù hợp cho mọi lứa tuổi.",
          price: 50000,
          discountPrice: 0,
          stock: 20,
          imageUrlThumb:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAtG09fHjF2OntOF7bewBoZrQOtxn_8Hquu7zddmVFB4fGbxvW2Oyo_BTdQOQRBoErDGP8iveLHKYLuDN5mzl9dzsHjkC1zfyyROs7C7EDEe032gsvMmi8aQQ6UKEDcIKQYAX5-CJFsl88-rhLTEbOzRa6s_k3lZTr0OlWfRG5VVu8Q-lmebnEqt3kXdywvMFCgA_EYTQZKGdEJhW4LQDbMCpo66HFZeM58HCXS4Q2liTRvC9pM9hsH2Ng3DzQcKGjBtHyFAY1ha1c",

          imageUrlArr: ["nuoc-yen-1.jpg", "nuoc-yen-2.jpg"],
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 8,
          name: "Nước Yến Chưng Sẵn k đường",
          category: "Nước yến",
          description:
            "Nước yến chưng sẵn bao gồm hạt sen, kỷ tử, táo đỏ. bổ sung năng lượng, phù hợp cho mọi lứa tuổi.",
          price: 50000,
          discountPrice: 0,
          stock: 20,
          imageUrlThumb:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAtG09fHjF2OntOF7bewBoZrQOtxn_8Hquu7zddmVFB4fGbxvW2Oyo_BTdQOQRBoErDGP8iveLHKYLuDN5mzl9dzsHjkC1zfyyROs7C7EDEe032gsvMmi8aQQ6UKEDcIKQYAX5-CJFsl88-rhLTEbOzRa6s_k3lZTr0OlWfRG5VVu8Q-lmebnEqt3kXdywvMFCgA_EYTQZKGdEJhW4LQDbMCpo66HFZeM58HCXS4Q2liTRvC9pM9hsH2Ng3DzQcKGjBtHyFAY1ha1c",
          imageUrlArr: ["nuoc-yen-1.jpg", "nuoc-yen-2.jpg"],
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 9,
          name: "Combo nấu yến bao gồm hạt sen, kỷ tử, táo đỏ, đường phèn",
          category: "Nước yến",
          description:
            "Combo nấu yến bao gồm hạt sen, kỷ tử, táo đỏ, đường phèn đủ để nấu 100g yến",
          price: 50000,
          discountPrice: 0,
          stock: 20,
          imageUrlThumb:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDeqaeY7NWEDfovuPxhRZazLkHMDYvFtx7EUIstw4xwhOCS1tHm3Z2kjOkmuNcW7vwzPg3hKfTm84Ef_0h-R2dQgP49t9ePScwMhEl8rQPMF8z_m7jcLSjyitKa4tDkouozZbN_lymo3q10uGoc08fWK8nv7lCuGT87EcLQ1AB5H5wnwbAp9ZYj6nFCpOZZNO3IbxrCMF5eOFEYlY9HB74TGNx62WXo6-BvhGQtk8HgdAjLsDrdVfpapUPSMfQWZkZrkWcmJDpDdAE",

          imageUrlArr: ["nuoc-yen-1.jpg", "nuoc-yen-2.jpg"],
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 10,
          name: "Set quà tặng yến sào",
          category: "QUA_TANG",

          description:
            "Set quà tặng yến sào bao gồm 100g yến tinh chế và hũ 100ml yến chưng hũ",
          price: 3600000,
          discountPrice: 0,
          stock: 20,
          imageUrlThumb:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBtD4aD3vbaPE2DpRt3oQiHxOUNMBcUy7sdw8YhZjf_bantWPMq95L198GXFMG11tkVTvI8JHhHIc2aiaMX2LjSBPuf-AvDl78cQKYvBch4Levro-ZMg7otKSOcfcVLTkW-b1qSMOt1iDvvfvwk2qRNkkC8_4N9hmL_fVTSt9kPGEzC9nimDFv4isVeGyOuXibyAopuvt1tLxUuIjnluIcXoN0t1jJ0FaPO3xVzxcJ4NpJc1YQfXmQixneFC7O8FdkWmVmZqZYLHTQ",
          imageUrlArr: ["nuoc-yen-1.jpg", "nuoc-yen-2.jpg"],
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );

    // ---- INSERT PRODUCT VARIANTS ----
    await queryInterface.bulkInsert(
      "ProductVariants",
      [
        // ---------- Variants for Product 1 ----------
        {
          productId: 1,
          variantName: "50g",
          price: 1700000,
          discountPrice: 0,
          stock: 30,
          createdAt: now,
          updatedAt: now,
        },
        {
          productId: 1,
          variantName: "100g",
          price: 3200000,
          discountPrice: 2100000,
          stock: 25,
          createdAt: now,
          updatedAt: now,
        },
        {
          productId: 2,
          variantName: "50g",
          price: 1500000,
          discountPrice: 0,
          stock: 10,
          createdAt: now,
          updatedAt: now,
        },
        {
          productId: 3,
          variantName: "100g",
          price: 2600000,
          discountPrice: 1300000,
          stock: 45,
          createdAt: now,
          updatedAt: now,
        },
        {
          productId: 3,
          variantName: "50g",
          price: 1300000,
          discountPrice: 0,
          stock: 10,
          createdAt: now,
          updatedAt: now,
        },

        // ---------- Variants for Product 2 ----------
        {
          productId: 4,
          variantName: "100g",
          price: 2700000,
          discountPrice: 1300000,
          stock: 45,
          createdAt: now,
          updatedAt: now,
        },
        {
          productId: 4,
          variantName: "50g",
          price: 1400000,
          discountPrice: 0,
          stock: 10,
          createdAt: now,
          updatedAt: now,
        },

        // ---------- Variants for Product 2 ----------
        {
          productId: 5,
          variantName: "50g",
          price: 800000,
          discountPrice: 0,
          stock: 45,
          createdAt: now,
          updatedAt: now,
        },
        {
          productId: 5,
          variantName: "100g",
          price: 1600000,
          discountPrice: 100000,
          stock: 45,
          createdAt: now,
          updatedAt: now,
        },
        {
          productId: 5,
          variantName: "1kg sỉ",
          price: 12000000,
          discountPrice: 2600000,
          stock: 20,
          createdAt: now,
          updatedAt: now,
        },
        {
          productId: 6,
          variantName: "50g",
          price: 100000,
          discountPrice: 0,
          stock: 45,
          createdAt: now,
          updatedAt: now,
        },
        {
          productId: 6,
          variantName: "100g",
          price: 2000000,
          discountPrice: 0,
          stock: 45,
          createdAt: now,
          updatedAt: now,
        },
        // ---------- Variants for Product 3 ----------
        {
          productId: 7,
          variantName: "Hũ 70ml",
          price: 50000,
          discountPrice: 0,
          stock: 40,
          createdAt: now,
          updatedAt: now,
        },
        {
          productId: 7,
          variantName: "Lốc 6 hũ",
          price: 280000,
          discountPrice: 0,
          stock: 3,
          createdAt: now,
          updatedAt: now,
        },
        {
          productId: 8,
          variantName: "Hũ 70ml",
          price: 40000,
          discountPrice: 0,
          stock: 40,
          createdAt: now,
          updatedAt: now,
        },
        {
          productId: 8,
          variantName: "Lốc 6 hũ",
          price: 220000,
          discountPrice: 0,
          stock: 3,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "FeaturedProducts",
      [
        {
          id: 1,
          productId: 1,
          type: "HOT",
          startDate: now,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 2,
          productId: 2,
          type: "HOT",
          startDate: now,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 3,
          productId: 7,
          type: "HOT",
          startDate: now,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 4,
          productId: 10,
          type: "HOT",
          startDate: now,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Blogs",
      [
        {
          id: 6,
          title:
            "Công dụng thần kỳ của Yến sào đối với sức khỏe người cao tuổi",
          slug: "cong-dung-yen-sao-cho-nguoi-cao-tuoi",
          content:
            "Yến sào không chỉ là món ăn ngon mà còn là dược phẩm quý giúp tăng cường đề kháng, cải thiện trí nhớ và phục hồi sức khỏe nhanh chóng cho người lớn tuổi.",
          excerpt:
            "Yến sào không chỉ là món ăn ngon mà còn là dược phẩm quý giúp tăng cường đề kháng, cải thiện trí nhớ và phục hồi sức khỏe nhanh chóng cho người lớn tuổi. Khám phá ngay những lợi ích bất ngờ.",
          category: "Sức khỏe",
          tags: ["Yến chưng", "Sức khỏe bà bầu", "Dinh dưỡng"],
          imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDSoW4IIQ2LjrBZgfX3soDQ21n7Funw4ZJvWEl-EFqAdiZQCdzFEwpBN8euCpY7J4RZaTzg_WklEsKC2jNQEDFN_dFUVbidpyIVRS4aXOOyIa7JxnKoD02fqGN2qKERwHeVsEzmnYVcoIfajsXmjWVo0UDlpUnuGcIITDznI96RWwWkzBmQNUExVBRMy52nlFZSIy8TpB40DUggLPY0V-Vf08m-fj6ESXmGgkHB7SnN48tb2oGr2PMc9XcAitafq3HSjSoTYr339LA",
          author: "Yến Tinh Hoa",
          markdown: "ád",
          publishedAt: new Date("2023-10-12T00:00:00.000Z"),
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 2,
          title: "Quy trình chế biến yến sào chuẩn khép kín đảm bảo vệ sinh",
          slug: "quy-trinh-che-bien-yen-sao",
          content:
            "Tìm hiểu quy trình từ khâu thu hoạch đến khi thành phẩm, đảm bảo giữ trọn vẹn dưỡng chất quý giá.",
          excerpt:
            "Tìm hiểu quy trình từ khâu thu hoạch đến khi thành phẩm, đảm bảo giữ trọn vẹn dưỡng chất quý giá.",
          category: "Quy trình",
          tags: ["Yến thô", "Quy trình"],
          imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB4MEoxI0rseMskzH3DKXx1pKCgTvnNVSSrNSiXvATh1sNAWS6jTeC-_VhqJuhRQD0kvsqY28qNIdrRiXV0q3SJeYWinN05aZkzKVVKIbpo3fvRrJB6NCqR_M-BRsB2QuOSfOjsNtRFyMyjAAO5N4d1yjt0b793HdTwcXO05IfNIo0vEiMPzYlBUtbWO6RQj9AwDCvPSgC_ZK_hrXWwr1eksEGYLidRCXobN9SkWg2U1KmBDfezFzXKDBLMUSIWJ93brs3J1JN6leQ",
          author: "Yến Tinh Hoa",
          markdown: "ád",

          publishedAt: new Date("2023-10-08T00:00:00.000Z"),
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 3,
          title: "5 Món ngon từ yến sào giúp đẹp da, giữ dáng cho phái đẹp",
          slug: "5-mon-ngon-yen-sao-dep-da",
          content:
            "Bỏ túi ngay 5 công thức chế biến yến sào đơn giản tại nhà giúp chị em phụ nữ duy trì nét thanh xuân.",
          excerpt:
            "Bỏ túi ngay 5 công thức chế biến yến sào đơn giản tại nhà giúp chị em phụ nữ duy trì nét thanh xuân.",
          category: "Công thức",
          tags: ["Công thức", "Làm đẹp", "Yến chưng"],
          markdown: "ád",

          imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAUtDwf7UXI-SkwXtp9DgPP9rNUyRxrx4J-Ff2OyBtpYKexuBJBvGrgcH8fIAS_8l-7XOxujY-KvZzstI_1HJvLIRRhMWAZyTcq3cMq2gC7DXKfHoJMY96zVyjnDpMCaVam01rs9fe3uffcYsC9NM451QOM0BvuDOJxaxJAzuo7Bd_BvGPNw2VTse-yzqHjv572cSSoH65Y4t9mq5FoZEQDT_nqyk6KK8kY1w7JfMwL0--9u1Cbpp58pBdf-fWANmb3-2fjbNquZuU",
          author: "Yến Tinh Hoa",
          publishedAt: new Date("2023-10-05T00:00:00.000Z"),
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 4,
          title: "Nguồn gốc yến đảo thiên nhiên và giá trị dinh dưỡng",
          slug: "nguon-goc-yen-dao-thien-nhien",
          markdown: "ád",

          content:
            "Sự khác biệt giữa yến đảo và yến nhà, và tại sao yến đảo lại có giá trị cao đến vậy?",
          excerpt:
            "Sự khác biệt giữa yến đảo và yến nhà, và tại sao yến đảo lại có giá trị cao đến vậy?",
          category: "Nguồn gốc",
          tags: ["Nguồn gốc", "Yến đảo", "Dinh dưỡng"],
          imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDsaMvq91MopV7KsmI_nMvY-fReDC54k9dtZuazS54xMyuB8i1i1yKxSJGRpZrj-TQtkDHaGFBuCHsBRMT5U3ok8jLUFDH9BMoOEA0m_vAkpIoCD1BOrb62oDDmfxEJzg42ffIsokoubAe8LkdLzRIYpCaA4pwymP6T6vPOoHz0vi3wUZV2NtKBMmfc6jM_sCzCdSJg6zi8ObKTI-pQg5gQ0ccPHlh6Ndnruv7foKLTZgni6aCJkP3HAuaByTCPZh5ezHdVbxbmtOo",
          author: "Yến Tinh Hoa",
          publishedAt: new Date("2023-10-01T00:00:00.000Z"),
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 5,
          title: "Phân biệt yến thật và yến giả: Những điều cần biết",
          slug: "phan-biet-yen-that-va-yen-gia",
          markdown: "ád",

          content:
            "Tránh mất tiền oan với những mẹo phân biệt yến sào thật giả đơn giản bằng mắt thường.",
          excerpt:
            "Tránh mất tiền oan với những mẹo phân biệt yến sào thật giả đơn giản bằng mắt thường.",
          category: "Kiến thức",
          tags: ["Kiến thức", "Yến thô", "Quà tặng"],
          imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuASkPyMY44ZbfAK4sqDDT-nKegKnPEcIfmlj4FFIqd2xYRyhIQIWvoyibqCCxiXRr4zN-bishOJBAbrCU1oEoHzMeNyZNZleCTW-c18fFLgcsyPI39dKzTxAgexKys8AefXZYZoTvDbwjm6LtMggJVS5p-pGh9Ng1Ob41JnXiaGMM8cH-60qlMRockghxjhTpWyb5qNnvv9cmXEWoNiUF-7hhSY5FnD9UxwXhFqipZ92BeCvbF_K3M4QMwVJvr_k_F9XYkckQzrLCM",
          author: "Yến Tinh Hoa",
          publishedAt: new Date("2023-09-28T00:00:00.000Z"),
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("ProductVariants", null, {});
    await queryInterface.bulkDelete("Products", null, {});
  },
};
