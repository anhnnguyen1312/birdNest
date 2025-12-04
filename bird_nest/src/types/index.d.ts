export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  gift: string | null;
  price: number;
  discountPrice: number;
  stock: number;
  imageUrlThumb: string;
  imageUrlArr: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  ProductVariants?: {
    variantName: string;
    price: number;
    discountPrice: number | null;
    stock: number;
    weight?: number | string;
  }[];
}
export interface FeaturedProduct {
  id: number;
  type: string;
  productId: number;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;

  products: Product;
}
