import { NextRequest, NextResponse } from "next/server";
import { Blogs } from "@/models/Blogs.model";
import sequelize from "@/lib/sequelize";
import { corsHeaders } from "@/helper/corsHandle";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    await sequelize.authenticate();

    const resolvedParams = await Promise.resolve(params);
    const id = parseInt(resolvedParams.id);

    if (isNaN(id)) {
      return NextResponse.json(
        {
          error: 1,
          message: "ID không hợp lệ",
        },
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // Get slug from query parameters
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    console.log("id blog", id, "slug", slug);

    let blog;
    if (slug) {
      // Query by both id and slug for security
      blog = await Blogs.findOne({
        where: {
          id: id,
          slug: slug,
        },
      });
    } else {
      // Fallback to id only (for backward compatibility)
      blog = await Blogs.findByPk(id);
    }

    if (!blog) {
      return NextResponse.json(
        {
          error: 1,
          message: "Không tìm thấy bài viết",
        },
        {
          status: 404,
          headers: corsHeaders(),
        }
      );
    }

    return NextResponse.json(
      {
        error: 0,
        message: "Get blog success",
        blog: blog,
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      {
        error: 1,
        message: "Lỗi khi lấy thông tin bài viết",
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}
