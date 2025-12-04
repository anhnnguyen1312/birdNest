import React from "react";
interface Props {
  name: string;
  price: number;
  urlImage: string;
}
export default function HotProductItem({ name, urlImage, price }: Props) {
  return (
    <div className="flex flex-col gap-3 pb-3 group">
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300"
        data-alt="A perfectly cleaned and processed bird's nest, ready for cooking."
        style={{
          backgroundImage: `url(${urlImage})`,
        }}
      ></div>
      <div>
        <p className="text-[#181611] dark:text-background-light text-base font-semibold leading-normal">
          {name}
        </p>
        <p className="text-primary text-sm font-bold leading-normal">
          {price.toLocaleString("vi-VN")}₫
        </p>
      </div>
    </div>
  );
}
