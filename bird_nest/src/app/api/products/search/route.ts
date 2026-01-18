import { NextRequest, NextResponse } from "next/server";
import { Products } from "@/models/Products.model";
import sequelize from "@/lib/sequelize";
import { Op } from "sequelize";
import { corsHeaders } from "@/helper/corsHandle";

/**
 * GET /api/products/search?q=keyword&limit=10
 * Tìm kiếm sản phẩm theo tên, mô tả, category
 */
export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();

    // Lấy query parameters
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Nếu không có query, trả về mảng rỗng
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        {
          error: 0,
          message: "Search success",
          products: [],
        },
        {
          status: 200,
          headers: corsHeaders(),
        }
      );
    }

    // Tìm kiếm sản phẩm theo tên, mô tả, category
    const products = await Products.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            category: {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
      limit: limit,
      order: [["name", "ASC"]],
    });

    return NextResponse.json(
      {
        error: 0,
        message: "Search success",
        products: products,
        query: query,
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: 1,
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}

