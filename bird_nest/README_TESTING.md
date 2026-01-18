# Testing Guide

## Setup

Đã cấu hình Jest và React Testing Library cho dự án. Để chạy tests:

```bash
# Cài đặt dependencies
npm install

# Chạy tất cả tests
npm test

# Chạy tests ở watch mode
npm run test:watch

# Chạy tests với coverage report
npm run test:coverage
```

## Test Files

### Component Tests

1. **Header Component** (`src/component/Header/__tests__/Header.test.tsx`)
   - Test rendering các elements
   - Test user menu interactions
   - Test theme toggle
   - Test cart count display
   - Test event handling

2. **SearchInput Component** (`src/component/SearchInput/__tests__/SearchInput.test.tsx`)
   - Test input handling
   - Test debounce logic
   - Test autocomplete suggestions
   - Test form submission
   - Test API calls
   - Test error handling

3. **ProductList Component** (`src/component/ProductPage/__tests__/ProductList.test.tsx`)
   - Test rendering với initial products
   - Test API calls (search và all products)
   - Test filtering logic
   - Test sorting
   - Test pagination
   - Test loading và error states

4. **SideBar Component** (`src/component/ProductPage/__tests__/SideBar.test.tsx`)
   - Test category selection
   - Test price range filter
   - Test weight filter
   - Test filter actions (clear, apply)

### Context Tests

5. **ProductFilterContext** (`src/context/__tests__/ProductFilterContext.test.tsx`)
   - Test initial state
   - Test setCategory với các giá trị khác nhau
   - Test setPriceRange với các ranges khác nhau
   - Test toggleWeight (add/remove)
   - Test clearFilters
   - Test applyFilters
   - Test isFilterApplied logic

### Page Tests

6. **Home Page** (`src/app/(app)/home/__tests__/page.test.tsx`)
   - Test rendering các sections
   - Test API calls
   - Test conditional rendering
   - Test error handling

7. **Landing Page** (`src/app/(public)/__tests__/page.test.tsx`)
   - Test rendering các sections
   - Test API calls với different responses
   - Test error handling

### Helper Tests

8. **cartHelpers** (`src/helper/__tests__/cartHelpers.test.ts`)
   - Test generateCartId (UUID format, uniqueness)
   - Test getCartIdFromCookie (various scenarios)
   - Test checkUserAuthentication (valid/invalid tokens)
   - Test getOrCreateGuestCart
   - Test getOrCreateUserCart với different userIds

### API Route Tests

9. **Search API** (`src/app/api/products/__tests__/search.test.ts`)
   - Test query parameter handling
   - Test search logic (name, description, category)
   - Test limit parameter
   - Test error handling
   - Test response format

## Test Coverage

Tests bao gồm:
- ✅ Component rendering
- ✅ User interactions (clicks, inputs, form submissions)
- ✅ State management
- ✅ Props handling
- ✅ Event handling
- ✅ API calls (mocked)
- ✅ Error handling
- ✅ Edge cases
- ✅ Function logic với different parameters

## Mocking

- Next.js router được mock trong `jest.setup.js`
- API calls được mock trong từng test file
- Components được mock khi cần thiết

## Notes

- Một số tests có thể cần điều chỉnh dựa trên implementation thực tế
- Mock data được sử dụng để test logic
- Cần cập nhật tests khi có thay đổi trong components

