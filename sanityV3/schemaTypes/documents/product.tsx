import {TagIcon} from '@sanity/icons'
import pluralize from 'pluralize-esm'
import ProductHiddenInput from '../../components/inputs/ProductHidden'
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'
import {defineField, defineType, Rule} from 'sanity'
import {getPriceRange} from '../../utils/getPriceRange'
import {GROUPS} from '../../constants'

// export const productType = defineType({
//   name: 'product',
//   title: 'Product',
//   type: 'document',
//   icon: TagIcon,
//   groups: GROUPS,
//   fields: [
//     defineField({
//       name: 'hidden',
//       type: 'string',
//       components: {
//         field: ProductHiddenInput,
//       },
//       group: GROUPS.map((group) => group.name),
//       hidden: ({parent}) => {
//         const isActive = parent?.store?.status === 'active'
//         const isDeleted = parent?.store?.isDeleted
//         return !parent?.store || (isActive && !isDeleted)
//       },
//     }),
//     defineField({
//       name: 'titleProxy',
//       title: 'Title',
//       type: 'proxyString',
//       options: {field: 'store.title'},
//     }),
//     defineField({
//       name: 'slugProxy',
//       title: 'Slug',
//       type: 'proxyString',
//       options: {field: 'store.slug.current'},
//     }),
//     defineField({
//       name: 'colorTheme',
//       type: 'reference',
//       to: [{type: 'colorTheme'}],
//       group: 'editorial',
//     }),
//     defineField({
//       name: 'body',
//       type: 'portableText',
//       group: 'editorial',
//     }),
//     defineField({
//       name: 'store',
//       type: 'shopifyProduct',
//       description: 'Product data from Shopify (read-only)',
//       group: 'shopifySync',
//     }),
//     defineField({
//       name: 'seo',
//       title: 'SEO',
//       type: 'seo',
//       group: 'seo',
//     }),
//   ],
//   orderings: [
//     {
//       name: 'titleAsc',
//       title: 'Title (A-Z)',
//       by: [{field: 'store.title', direction: 'asc'}],
//     },
//     {
//       name: 'titleDesc',
//       title: 'Title (Z-A)',
//       by: [{field: 'store.title', direction: 'desc'}],
//     },
//     {
//       name: 'priceDesc',
//       title: 'Price (Highest first)',
//       by: [{field: 'store.priceRange.minVariantPrice', direction: 'desc'}],
//     },
//     {
//       name: 'priceAsc',
//       title: 'Price (Lowest first)',
//       by: [{field: 'store.priceRange.minVariantPrice', direction: 'asc'}],
//     },
//   ],
//   preview: {
//     select: {
//       isDeleted: 'store.isDeleted',
//       options: 'store.options',
//       previewImageUrl: 'store.previewImageUrl',
//       priceRange: 'store.priceRange',
//       status: 'store.status',
//       title: 'store.title',
//       variants: 'store.variants',
//     },
//     prepare(selection) {
//       const {isDeleted, options, previewImageUrl, priceRange, status, title, variants} = selection

//       const optionCount = options?.length
//       const variantCount = variants?.length

//       let description = [
//         variantCount ? pluralize('variant', variantCount, true) : 'No variants',
//         optionCount ? pluralize('option', optionCount, true) : 'No options',
//       ]

//       let subtitle = getPriceRange(priceRange)
//       if (status !== 'active') {
//         subtitle = '(Unavailable in Shopify)'
//       }
//       if (isDeleted) {
//         subtitle = '(Deleted from Shopify)'
//       }

//       return {
//         description: description.join(' / '),
//         subtitle,
//         title,
//         media: (
//           <ShopifyDocumentStatus
//             isActive={status === 'active'}
//             isDeleted={isDeleted}
//             type="product"
//             url={previewImageUrl}
//             title={title}
//           />
//         ),
//       }
//     },
//   },
// })
// schemas/product.js
export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'Uncategorized',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'gift',
      title: 'Gift',
      type: 'string',
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
    {
      name: 'imageUrlThumb',
      title: 'Thumbnail Image URL',
      type: 'url',
    },
    {
      name: 'imageUrlArr',
      title: 'Image URLs',
      type: 'array',
      of: [{type: 'url'}],
    },
    {
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'productVariant'}]}],
    },
  ],
})
