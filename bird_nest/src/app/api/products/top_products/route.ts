import { NextRequest, NextResponse } from "next/server";
import { Products } from "@/models/Products.model";
import { FeaturedProducts } from "@/models/FeaturedProducts";
import sequelize from "@/lib/sequelize";
export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();

    const topProducts = await FeaturedProducts.findAll({
      where: { type: "TOP" },
      include: [
        {
          model: Products,
          attributes: ["id", "name", "price", "imageUrlThumb", "discountPrice"],

          required: true, // dùng INNER JOIN
        },
      ],
    });
    return NextResponse.json({
      message: "Get top products success",
      error: 0,
      hotProducts: topProducts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
