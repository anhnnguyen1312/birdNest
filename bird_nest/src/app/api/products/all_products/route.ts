import { NextRequest, NextResponse } from "next/server";
import { Products } from "@/models/Products.model";
import sequelize from "@/lib/sequelize";

export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();

    const products = await Products.findAll({});
    return NextResponse.json({
      error: 0,
      message: "Get products success",
      products: products,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error: 1 },

      { status: 500 }
    );
  }
}
