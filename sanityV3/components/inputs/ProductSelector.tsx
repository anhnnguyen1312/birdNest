import React, {useEffect, useState} from 'react'

// Khai báo kiểu cho sản phẩm
export interface ProductVariants {
  id?: number
  variantName: string
  price: number
  discountPrice: number | null
  stock: number
  weight?: number | string
}
export interface Product {
  id: number
  name: string
  category: string
  description: string
  gift: string | null
  price: number
  discountPrice: number
  stock: number
  imageUrlThumb: string
  imageUrlArr: string[]
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  ProductVariants?: ProductVariants[]
}

// Khai báo kiểu cho props của component
interface ProductSelectorProps {
  value: number | string
  onChange: (value: number | string) => void
}

const ProductSelector: React.FC<ProductSelectorProps> = ({value, onChange}) => {
  const [products, setProducts] = useState<Product[]>([]) // state kiểu Product[]

  useEffect(() => {
    // Fetch sản phẩm từ API Next.js
    fetch('http://localhost:3000/api/products/all_products')
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products', err))
  }, [])
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {products.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
  )
}

export default ProductSelector
