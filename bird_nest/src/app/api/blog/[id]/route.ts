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

    const blog = await Blogs.findByPk(id);

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
