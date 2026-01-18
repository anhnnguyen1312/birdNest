import {InfoOutlineIcon, AddCircleIcon} from '@sanity/icons'
import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

async function fetchProducts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/products/all_products`)
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }
    const data = await response.json()
    return data.error === 0 && Array.isArray(data.products) ? data.products : []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}
export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Products')
    .schemaType('product')
    .child(async () => {
      // Fetch products from API
      const products = await fetchProducts()

      // If no products found, return empty list
      if (!products || products.length === 0) {
        return S.list().title('Products').items([])
      }

      // Create list items for each product
      const productItems = products.map((product: any) => {
        const productId = `product-${product.id}`

        return S.listItem()
          .title(product.name || `Product ${product.id}`)
          .id(productId)
          .schemaType('product')
          .child(
            S.list()
              .title(product.name || 'Product')
              .canHandleIntent(
                (intentName, params) => intentName === 'edit' && params.type === 'product',
              )
              .items([
                // Details
                S.listItem()
                  .title('Details')
                  .icon(InfoOutlineIcon)
                  .schemaType('product')
                  .id(productId)
                  .child(S.document().schemaType('product').documentId(productId)),
                // Product variants
                S.listItem()
                  .title('Variants')
                  .schemaType('productVariant')
                  .child(
                    S.documentList()
                      .title('Variants')
                      .schemaType('productVariant')
                      .filter(
                        `
                        _type == "productVariant"
                        && store.productId == $productId
                      `,
                      )
                      .params({
                        productId: product.id,
                      })
                      .canHandleIntent(
                        (intentName, params) =>
                          intentName === 'edit' && params.type === 'productVariant',
                      ),
                  ),
              ]),
          )
      })
      productItems.unshift(
        S.listItem()
          .title('➕ Create Product')
          .icon(AddCircleIcon)
          .child(S.document().schemaType('product').documentId('create-product')),
      )
      return S.list().title('Products').items(productItems)
    }),
)
