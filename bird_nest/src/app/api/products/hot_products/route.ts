import { NextRequest, NextResponse } from "next/server";
import { Products } from "@/models/Products.model";
import { FeaturedProducts } from "@/models/FeaturedProducts";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import sequelize from "@/lib/sequelize";
import jwtVerify from "@/helper/jwtVerify";
export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();
    const error = await jwtVerify(cookies);
    if (!error) {
      return NextResponse.json(
        { error: " access Token expired rồi" },
        { status: 401 }
      );
    }
    const hotProducts = await FeaturedProducts.findAll({
      where: { type: "HOT" },
      include: [
        {
          model: Products,
          attributes: ["id", "name", "price", "imageUrlThumb", "discountPrice"],

          required: true, // dùng INNER JOIN
        },
      ],
    });
    return NextResponse.json({
      message: "Get products success",
      error: 0,
      hotProducts: hotProducts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
