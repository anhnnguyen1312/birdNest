import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/helper/corsHandle";
import { Blog } from "@/types";

// Mock data - same as all_blog route
const mockBlogs: Blog[] = [
  {
    id: 1,
    title: "Công dụng thần kỳ của Yến sào đối với sức khỏe người cao tuổi",
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
    publishedAt: "2023-10-12T00:00:00.000Z",
    createdAt: "2023-10-12T00:00:00.000Z",
    updatedAt: "2023-10-12T00:00:00.000Z",
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
    publishedAt: "2023-10-08T00:00:00.000Z",
    createdAt: "2023-10-08T00:00:00.000Z",
    updatedAt: "2023-10-08T00:00:00.000Z",
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
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUtDwf7UXI-SkwXtp9DgPP9rNUyRxrx4J-Ff2OyBtpYKexuBJBvGrgcH8fIAS_8l-7XOxujY-KvZzstI_1HJvLIRRhMWAZyTcq3cMq2gC7DXKfHoJMY96zVyjnDpMCaVam01rs9fe3uffcYsC9NM451QOM0BvuDOJxaxJAzuo7Bd_BvGPNw2VTse-yzqHjv572cSSoH65Y4t9mq5FoZEQDT_nqyk6KK8kY1w7JfMwL0--9u1Cbpp58pBdf-fWANmb3-2fjbNquZuU",
    author: "Yến Tinh Hoa",
    publishedAt: "2023-10-05T00:00:00.000Z",
    createdAt: "2023-10-05T00:00:00.000Z",
    updatedAt: "2023-10-05T00:00:00.000Z",
  },
  {
    id: 4,
    title: "Nguồn gốc yến đảo thiên nhiên và giá trị dinh dưỡng",
    slug: "nguon-goc-yen-dao-thien-nhien",
    content:
      "Sự khác biệt giữa yến đảo và yến nhà, và tại sao yến đảo lại có giá trị cao đến vậy?",
    excerpt:
      "Sự khác biệt giữa yến đảo và yến nhà, và tại sao yến đảo lại có giá trị cao đến vậy?",
    category: "Nguồn gốc",
    tags: ["Nguồn gốc", "Yến đảo", "Dinh dưỡng"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsaMvq91MopV7KsmI_nMvY-fReDC54k9dtZuazS54xMyuB8i1i1yKxSJGRpZrj-TQtkDHaGFBuCHsBRMT5U3ok8jLUFDH9BMoOEA0m_vAkpIoCD1BOrb62oDDmfxEJzg42ffIsokoubAe8LkdLzRIYpCaA4pwymP6T6vPOoHz0vi3wUZV2NtKBMmfc6jM_sCzCdSJg6zi8ObKTI-pQg5gQ0ccPHlh6Ndnruv7foKLTZgni6aCJkP3HAuaByTCPZh5ezHdVbxbmtOo",
    author: "Yến Tinh Hoa",
    publishedAt: "2023-10-01T00:00:00.000Z",
    createdAt: "2023-10-01T00:00:00.000Z",
    updatedAt: "2023-10-01T00:00:00.000Z",
  },
  {
    id: 5,
    title: "Phân biệt yến thật và yến giả: Những điều cần biết",
    slug: "phan-biet-yen-that-va-yen-gia",
    content:
      "Tránh mất tiền oan với những mẹo phân biệt yến sào thật giả đơn giản bằng mắt thường.",
    excerpt:
      "Tránh mất tiền oan với những mẹo phân biệt yến sào thật giả đơn giản bằng mắt thường.",
    category: "Kiến thức",
    tags: ["Kiến thức", "Yến thô", "Quà tặng"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuASkPyMY44ZbfAK4sqDDT-nKegKnPEcIfmlj4FFIqd2xYRyhIQIWvoyibqCCxiXRr4zN-bishOJBAbrCU1oEoHzMeNyZNZleCTW-c18fFLgcsyPI39dKzTxAgexKys8AefXZYZoTvDbwjm6LtMggJVS5p-pGh9Ng1Ob41JnXiaGMM8cH-60qlMRockghxjhTpWyb5qNnvv9cmXEWoNiUF-7hhSY5FnD9UxwXhFqipZ92BeCvbF_K3M4QMwVJvr_k_F9XYkckQzrLCM",
    author: "Yến Tinh Hoa",
    publishedAt: "2023-09-28T00:00:00.000Z",
    createdAt: "2023-09-28T00:00:00.000Z",
    updatedAt: "2023-09-28T00:00:00.000Z",
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        {
          error: 0,
          message: "Get blogs success",
          blogs: mockBlogs,
        },
        {
          status: 200,
          headers: corsHeaders(),
        }
      );
    }

    const searchTerm = query.trim().toLowerCase();

    // TODO: Replace with actual database query
    // await sequelize.authenticate();
    // const blogs = await Blogs.findAll({
    //   where: {
    //     [Op.or]: [
    //       { title: { [Op.iLike]: `%${searchTerm}%` } },
    //       { content: { [Op.iLike]: `%${searchTerm}%` } },
    //       { excerpt: { [Op.iLike]: `%${searchTerm}%` } },
    //     ],
    //   },
    // });

    // Simple mock search
    const filteredBlogs = mockBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.content.toLowerCase().includes(searchTerm) ||
        blog.excerpt.toLowerCase().includes(searchTerm) ||
        blog.category.toLowerCase().includes(searchTerm) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );

    return NextResponse.json(
      {
        error: 0,
        message: "Search blogs success",
        blogs: filteredBlogs,
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error: 1 },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}
