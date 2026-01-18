export interface ProductVariant {
  id?: number;
  variantName: string;
  price: number;
  discountPrice: number | null;
  stock: number;
  weight?: number | string;
}
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
  ProductVariants?: ProductVariant[];
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
export interface CartItems {
  cartId: number;
  createdAt: string;
  id: number;
  productId: number;
  ProductVariant: ProductVariant;
  Product: {
    discountPrice: number;
    id: number;
    imageUrlThumb: string;
    name: string;
    price: number;
  };
  quantity: number;
  updatedAt: string;
  varientId: number;
}
export interface itemsOrder {
  id?: number;
  productId: number;
  variantId: number;
  price: number;
  quantity: number;
  orderId: number;
  total: number;
}
export interface OrderType {
  id: number;
  userId: number;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  totalPrice: number;
  totalQuantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: itemsOrder[];
}
interface ProductType {
  id: number;
  name: string;
  gift: string;
  imageUrlThumb: string;
}
type CustomOrderTypeFull = Omit<OrderType, "items"> & {
  OrderItems: (itemsOrder & { product: ProductType })[];
};

export interface ConversationType {
  type: "group" | "private";
  groupName?: string;
  members: string[];
  lastMessage: string;
  lastTimestamp: number;
}

export interface ConversationWithId extends ConversationType {
  id: string;
}
export interface UIConversationItem {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastTimestamp: number;
}
export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Message {
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: number;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  imageUrl: string;
  author?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}
export interface ProductCheckout {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  imageUrlThumb: string;
}
export interface ProductVariant {
  id: number;
  variantName: string;
  price: number;
  discountPrice: number;
}
export interface CheckoutItem {
  id: number;
  checkoutId: number;
  productId: number;
  variantId: number | null;
  quantity: number;

  priceSnapshot: string;
  totalprice: string;

  createdAt: string;
  updatedAt: string;

  Product: ProductCheckout;
  ProductVariant: ProductVariant;
}

export interface CheckoutSession {
  id: number;
  userId: number;

  source: "cart" | "buy_now";
  status: "active" | "completed" | "expired" | string;

  subtotal: number;
  discount: number;
  shippingFee: number;
  totalPrice: number;

  expiresAt: string;

  items: CheckoutItem[]; // ✅ array of checkout items
}
