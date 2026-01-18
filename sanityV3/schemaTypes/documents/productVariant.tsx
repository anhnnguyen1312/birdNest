import {CopyIcon} from '@sanity/icons'
import {defineField, defineType, Rule} from 'sanity'

import ProductVariantHiddenInput from '../../components/inputs/ProductVariantHidden'
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'
import {GROUPS} from '../../constants'

// export const productVariantType = defineType({
//   name: 'productVariant',
//   title: 'Product variant',
//   type: 'document',
//   icon: CopyIcon,
//   groups: GROUPS,
//   fields: [
//     defineField({
//       name: 'hidden',
//       type: 'string',
//       components: {
//         field: ProductVariantHiddenInput,
//       },
//       hidden: ({parent}) => {
//         const isDeleted = parent?.store?.isDeleted

//         return !isDeleted
//       },
//     }),
//     defineField({
//       title: 'Title',
//       name: 'titleProxy',
//       type: 'proxyString',
//       options: {field: 'store.title'},
//     }),
//     defineField({
//       name: 'store',
//       title: 'Shopify',
//       description: 'Variant data from Shopify (read-only)',
//       type: 'shopifyProductVariant',
//       group: 'shopifySync',
//     }),
//   ],
//   preview: {
//     select: {
//       isDeleted: 'store.isDeleted',
//       previewImageUrl: 'store.previewImageUrl',
//       sku: 'store.sku',
//       status: 'store.status',
//       title: 'store.title',
//     },
//     prepare(selection) {
//       const {isDeleted, previewImageUrl, sku, status, title} = selection

//       return {
//         media: (
//           <ShopifyDocumentStatus
//             isActive={status === 'active'}
//             isDeleted={isDeleted}
//             type="productVariant"
//             url={previewImageUrl}
//             title={title}
//           />
//         ),
//         subtitle: sku,
//         title,
//       }
//     },
//   },
// })
// schemas/productVariant.js
export const productVariantType = defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'document',
  fields: [
    {
      name: 'productId',
      title: 'Product ID',
      type: 'number',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'variantName',
      title: 'Variant Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'discountPrice',
      title: 'Discount Price',
      type: 'number',
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number',
      initialValue: 0,
    },
  ],
})
