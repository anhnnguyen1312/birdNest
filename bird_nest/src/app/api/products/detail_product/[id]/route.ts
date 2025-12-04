import { NextRequest, NextResponse } from "next/server";
import { Products } from "@/models/Products.model";
import sequelize from "@/lib/sequelize";
import { ProductVariant } from "@/models/ProductVarient.model";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await sequelize.authenticate();

    const id = (await context.params).id;
    console.log(id, "id");
    if (!id) {
      return NextResponse.json(
        { message: "Product not found", error: 1 },
        { status: 404 }
      );
    }

    const product = await Products.findOne({
      where: { id },
      include: [
        {
          model: ProductVariant,
        },
      ],
    });
    console.log(product, "product");

    if (!product) {
      return NextResponse.json(
        { message: "Product not found", error: 1 },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Get product detail success",
      error: 0,
      product,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
