import React from "react";
import ProductItem from "./ProductItem";
import ProductItemV2 from "./ProductItemV2";
import ProductItemV3 from "./ProductItemV3";
import { Product } from "@/types/index";

/**
 * FILE DEMO: Các cách sử dụng ProductItem component
 * 
 * CÁCH 1: Truyền product object
 * CÁCH 2: Spread product + thêm props
 * CÁCH 3: Destructure trong component cha
 */

interface ProductItemExamplesProps {
  products: Product[];
}

export default function ProductItemExamples({ products }: ProductItemExamplesProps) {
  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product);
  };

  const handleAddToCartById = (id: number) => {
    console.log("Add to cart by id:", id);
  };

  return (
    <div className="space-y-8 p-6">
      <section>
        <h2 className="text-2xl font-bold mb-4">
          CÁCH 1: Truyền product object
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Component nhận toàn bộ product object làm prop
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              showRating={true}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-x-auto">
          <code>{`// Sử dụng:
<ProductItem 
  product={product} 
  showRating={true}
  onAddToCart={handleAddToCart}
/>

// Interface:
interface ProductItemProps {
  product: Product;
  className?: string;
  showRating?: boolean;
  onAddToCart?: (product: Product) => void;
}`}</code>
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          CÁCH 2: Spread product + thêm props
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Spread tất cả properties của product và thêm props bổ sung
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductItemV2
              key={product.id}
              {...product} // Spread tất cả properties của Product
              additionalProp="Sản phẩm nổi bật"
              className="border-2 border-primary rounded-lg p-2"
              showRating={true}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-x-auto">
          <code>{`// Sử dụng:
<ProductItemV2
  {...product} // Spread tất cả properties
  additionalProp="Sản phẩm nổi bật"
  className="custom-class"
  showRating={true}
  onAddToCart={handleAddToCart}
/>

// Interface:
interface ProductItemV2Props extends Product {
  additionalProp?: string;
  className?: string;
  showRating?: boolean;
  onAddToCart?: (product: Product) => void;
}`}</code>
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          CÁCH 3: Destructure trong component cha
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Destructure product trong component cha, truyền từng property riêng
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => {
            // Destructure trong component cha
            const { id, name, price, imageUrlThumb, discountPrice, category, description, ...restProduct } = product;

            return (
              <ProductItemV3
                key={id}
                id={id}
                name={name}
                price={price}
                imageUrlThumb={imageUrlThumb}
                discountPrice={discountPrice}
                category={category}
                description={description}
                {...restProduct} // Spread các props còn lại
                className="hover:shadow-lg transition-shadow"
                showRating={true}
                onAddToCart={handleAddToCartById}
              />
            );
          })}
        </div>
        <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-x-auto">
          <code>{`// Sử dụng:
const { id, name, price, ...restProduct } = product;

<ProductItemV3
  id={id}
  name={name}
  price={price}
  {...restProduct}
  onAddToCart={handleAddToCartById}
/>

// Interface:
interface ProductItemV3Props {
  id: number;
  name: string;
  price: number;
  imageUrlThumb: string;
  discountPrice?: number;
  // ... các props khác
  [key: string]: any; // Cho phép nhận thêm props
}`}</code>
        </pre>
      </section>

      <section className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">So sánh 3 cách:</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>Cách 1:</strong> Đơn giản, dễ hiểu, phù hợp khi chỉ cần
            truyền object
          </li>
          <li>
            <strong>Cách 2:</strong> Linh hoạt, có thể spread và override
            properties, phù hợp khi muốn customize nhiều
          </li>
          <li>
            <strong>Cách 3:</strong> Kiểm soát tốt từng property, phù hợp khi
            cần xử lý logic trước khi truyền vào component
          </li>
        </ul>
      </section>
    </div>
  );
}




