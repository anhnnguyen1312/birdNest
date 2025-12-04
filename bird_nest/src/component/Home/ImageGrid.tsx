"use client";
import React, { useEffect, useState } from "react";
import HotProductItem from "./HotProductItem";
import { FeaturedProduct } from "@/types/index";
import fetchWithAuth from "@/helper/fetchWithAuth";
function ImageGrid() {
  const [listHotProducts, setListHotProducts] = useState<FeaturedProduct[]>([]);
  useEffect(() => {
    const fetchHotProducts = () => {
      fetchWithAuth("/api/products/hot_products")
        .then((data) => data.json())
        .then((data) => {
          if (data.hotProducts.length > 0) {
            setListHotProducts(data.hotProducts);
            console.log(data.hotProducts);
          }
        })
        .catch((e) => console.log(e));
    };

    fetchHotProducts();
  }, []);
  const listMapProducts =
    listHotProducts &&
    listHotProducts.map((item: FeaturedProduct) => (
      <HotProductItem
        urlImage={item.products.imageUrlThumb}
        key={item.id}
        name={item.products.name}
        price={item.products.price}
      />
    ));
  return (
    <div className="py-10">
      <h2 className="text-[#181611] dark:text-background-light text-center text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-8 pt-5">
        Sản Phẩm Nổi Bật
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 p-4">
        {listMapProducts}
      </div>
    </div>
  );
}

export default ImageGrid;
