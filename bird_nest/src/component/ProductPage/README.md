# ProductItem Component - 3 Cách Sử Dụng

File này giải thích 3 cách khác nhau để sử dụng ProductItem component với TypeScript.

## 📁 Các File Component

- `ProductItem.tsx` - Cách 1: Truyền product object
- `ProductItemV2.tsx` - Cách 2: Spread product + thêm props  
- `ProductItemV3.tsx` - Cách 3: Destructure trong component cha
- `ProductItemExamples.tsx` - File demo tất cả 3 cách

---

## 🔷 CÁCH 1: Truyền product object

**File:** `ProductItem.tsx`

### Interface:
```typescript
interface ProductItemProps {
  product: Product;
  className?: string;
  showRating?: boolean;
  onAddToCart?: (product: Product) => void;
}
```

### Cách sử dụng:
```tsx
<ProductItem 
  product={product} 
  showRating={true}
  onAddToCart={handleAddToCart}
/>
```

### Ưu điểm:
- ✅ Đơn giản, dễ hiểu
- ✅ Type-safe với Product interface
- ✅ Dễ maintain khi Product thay đổi
- ✅ Phù hợp khi chỉ cần truyền object

### Nhược điểm:
- ❌ Phải truy cập qua `product.name`, `product.price`
- ❌ Không thể override properties của Product

---

## 🔷 CÁCH 2: Spread product + thêm props

**File:** `ProductItemV2.tsx`

### Interface:
```typescript
interface ProductItemV2Props extends Product {
  additionalProp?: string;
  className?: string;
  showRating?: boolean;
  onAddToCart?: (product: Product) => void;
}
```

### Cách sử dụng:
```tsx
<ProductItemV2
  {...product} // Spread tất cả properties của Product
  additionalProp="Sản phẩm nổi bật"
  className="custom-class"
  showRating={true}
  onAddToCart={handleAddToCart}
/>
```

### Ưu điểm:
- ✅ Linh hoạt, có thể override properties
- ✅ Truy cập trực tiếp: `name`, `price` thay vì `product.name`
- ✅ Có thể thêm props tùy chỉnh
- ✅ Phù hợp khi muốn customize nhiều

### Nhược điểm:
- ❌ Phải destructure nhiều properties trong component
- ❌ Có thể conflict nếu props trùng tên

---

## 🔷 CÁCH 3: Destructure trong component cha

**File:** `ProductItemV3.tsx`

### Interface:
```typescript
interface ProductItemV3Props {
  id: number;
  name: string;
  price: number;
  imageUrlThumb: string;
  discountPrice?: number;
  category?: string;
  description?: string;
  className?: string;
  showRating?: boolean;
  onAddToCart?: (id: number) => void;
  [key: string]: any; // Cho phép nhận thêm props
}
```

### Cách sử dụng:
```tsx
// Destructure trong component cha
const { id, name, price, imageUrlThumb, discountPrice, category, description, ...restProduct } = product;

<ProductItemV3
  id={id}
  name={name}
  price={price}
  imageUrlThumb={imageUrlThumb}
  discountPrice={discountPrice}
  category={category}
  description={description}
  {...restProduct} // Spread các props còn lại
  className="hover:shadow-lg"
  showRating={true}
  onAddToCart={handleAddToCartById}
/>
```

### Ưu điểm:
- ✅ Kiểm soát tốt từng property
- ✅ Có thể xử lý logic trước khi truyền vào
- ✅ Có thể transform data trước khi render
- ✅ Phù hợp khi cần xử lý phức tạp

### Nhược điểm:
- ❌ Code dài hơn
- ❌ Phải destructure thủ công
- ❌ Dễ quên truyền một số properties

---

## 📊 So sánh 3 cách

| Tiêu chí | Cách 1 | Cách 2 | Cách 3 |
|----------|--------|--------|--------|
| **Độ đơn giản** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Tính linh hoạt** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Type Safety** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Khả năng override** | ❌ | ✅ | ✅ |
| **Xử lý logic** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Maintainability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🎯 Khi nào dùng cách nào?

### Dùng **Cách 1** khi:
- Component đơn giản, chỉ hiển thị data
- Không cần override properties
- Muốn code ngắn gọn, dễ đọc

### Dùng **Cách 2** khi:
- Cần override một số properties của Product
- Muốn thêm nhiều props tùy chỉnh
- Cần truy cập trực tiếp properties (không qua `product.`)

### Dùng **Cách 3** khi:
- Cần xử lý logic phức tạp trước khi render
- Cần transform/validate data
- Muốn kiểm soát chính xác từng property

---

## 📝 Ví dụ thực tế

Xem file `ProductItemExamples.tsx` để xem code demo đầy đủ của cả 3 cách.

```tsx
import ProductItemExamples from './ProductItemExamples';

// Sử dụng trong page
<ProductItemExamples products={products} />
```

---

## 🔧 Lưu ý khi sử dụng

1. **Cách 1** là cách phổ biến nhất và được khuyến nghị cho hầu hết trường hợp
2. **Cách 2** phù hợp khi bạn muốn tái sử dụng component với nhiều biến thể
3. **Cách 3** chỉ nên dùng khi thực sự cần xử lý logic phức tạp
4. Luôn đảm bảo type safety với TypeScript
5. Sử dụng optional chaining (`?.`) khi truy cập nested properties








