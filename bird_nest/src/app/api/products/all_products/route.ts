import { NextRequest, NextResponse } from "next/server";
import { Products } from "@/models/Products.model";
import sequelize from "@/lib/sequelize";
import { corsHeaders } from "@/helper/corsHandle";

export async function GET(req: NextRequest) {
  try {
    await sequelize.authenticate();

    const products = await Products.findAll({});
    return NextResponse.json(
      {
        error: 0,
        message: "Get products success",
        products: products,
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

      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    await sequelize.authenticate();
    const body = await req.json();

    const {
      name,
      category,
      description,
      price,
      gift,
      discountPrice,
      stock,
      imageUrlThumb,
      imageUrlArr,
    } = body;

    if (!name || price === undefined) {
      return NextResponse.json(
        { error: 1, message: "Name and price are required." },
        { status: 400 }
      );
    }

    const newProduct = await Products.create({
      name,
      category: category || "Uncategorized",
      description: description || "",
      price,
      gift: gift || "",
      discountPrice: discountPrice || 0,
      stock: stock || 0,
      imageUrlThumb: imageUrlThumb || "",
      imageUrlArr: imageUrlArr || [],
    });

    return NextResponse.json({
      error: 0,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error: 1 },
      { status: 500 }
    );
  }
}
