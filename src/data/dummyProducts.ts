import { IProduct } from '@/types'

export const dummyProducts: IProduct[] = [
  {
    _id: 'product-123',
    name: 'Premium Leather Jacket',
    slug: {
      current: 'premium-leather-jacket',
      _type: 'slug',
    },
    images: [
      '/products/leather-jacket-1.webp',
      '/products/leather-jacket-2.webp',
    ],
    category: {
      _id: 'category-456',
      name: 'Jackets',
      slug: {
        current: 'jackets',
        _type: 'slug',
      },
    },
    description:
      'A high-quality leather jacket made from premium materials, perfect for any season.',
    color: 'Black',
    sku: 'JKT-BLK-001',
    originalPrice: 250,
    discountPrice: 200,
    stock: 50,
    rating: 4.5,
    additionalDetails: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'detail-1',
            _type: 'span',
            text: 'This leather jacket is crafted with precision and attention to detail. It features:',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'detail-2',
            _type: 'span',
            text: '- Premium full-grain leather',
            marks: [],
          },
        ],
      },
    ],
    reviews: [],
    overallRating: 4.5,
    createdAt: '2023-10-15T12:34:56Z',
    status: 'active',
  },
  {
    _id: 'product-124',
    name: 'Classic Denim Jeans',
    slug: {
      current: 'classic-denim-jeans',
      _type: 'slug',
    },
    images: ['/products/jeans-1.webp', '/products/jeans-2.webp'],
    category: {
      _id: 'category-457',
      name: 'Jeans',
      slug: {
        current: 'jeans',
        _type: 'slug',
      },
    },
    description:
      'Classic fit denim jeans with premium wash and comfortable stretch fabric.',
    color: 'Blue',
    sku: 'JNS-BLU-001',
    originalPrice: 120,
    discountPrice: 99,
    stock: 100,
    rating: 4.2,
    additionalDetails: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'detail-1',
            _type: 'span',
            text: 'Premium denim with perfect stretch',
            marks: [],
          },
        ],
      },
    ],
    reviews: [],
    overallRating: 4.2,
    createdAt: '2023-10-16T10:24:36Z',
    status: 'active',
  },
  {
    _id: 'product-125',
    name: 'Cotton T-Shirt',
    slug: {
      current: 'cotton-t-shirt',
      _type: 'slug',
    },
    images: ['/products/tshirt-1.webp', '/products/tshirt-2.webp'],
    category: {
      _id: 'category-458',
      name: 'T-Shirts',
      slug: {
        current: 't-shirts',
        _type: 'slug',
      },
    },
    description:
      'Soft and comfortable cotton t-shirt perfect for everyday wear.',
    color: 'White',
    sku: 'TSH-WHT-001',
    originalPrice: 35,
    discountPrice: 29,
    stock: 200,
    rating: 4.0,
    additionalDetails: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'detail-1',
            _type: 'span',
            text: 'Made with 100% organic cotton',
            marks: [],
          },
        ],
      },
    ],
    reviews: [],
    overallRating: 4.0,
    createdAt: '2023-10-17T09:14:26Z',
    status: 'draft',
  },
  {
    _id: 'product-126',
    name: 'Running Shoes',
    slug: {
      current: 'running-shoes',
      _type: 'slug',
    },
    images: ['/products/shoes-1.webp', '/products/shoes-2.webp'],
    category: {
      _id: 'category-459',
      name: 'Shoes',
      slug: {
        current: 'shoes',
        _type: 'slug',
      },
    },
    description:
      'High-performance running shoes with advanced cushioning technology.',
    color: 'Red',
    sku: 'SHO-RED-001',
    originalPrice: 180,
    discountPrice: 150,
    stock: 60,
    rating: 4.7,
    additionalDetails: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'detail-1',
            _type: 'span',
            text: 'Features responsive cushioning',
            marks: [],
          },
        ],
      },
    ],
    reviews: [],
    overallRating: 4.7,
    createdAt: '2023-10-18T15:44:16Z',
    status: 'active',
  },
  {
    _id: 'product-127',
    name: 'Backpack',
    slug: {
      current: 'backpack',
      _type: 'slug',
    },
    images: [
      '/products/backpack-1.webp',
      '/products/backpack-2.webp',
      '/products/backpack-3.webp',
      '/products/backpack-4.webp',
    ],
    category: {
      _id: 'category-460',
      name: 'Bags',
      slug: {
        current: 'bags',
        _type: 'slug',
      },
    },
    description:
      'Durable backpack with multiple compartments and laptop sleeve.',
    color: 'Blue',
    sku: 'BAG-BLU-001',
    originalPrice: 90,
    discountPrice: 75,
    stock: 80,
    rating: 4.3,
    additionalDetails: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _key: 'detail-1',
            _type: 'span',
            text: 'Water-resistant material',
            marks: [],
          },
        ],
      },
    ],
    reviews: [],
    overallRating: 4.3,
    createdAt: '2023-10-19T11:34:46Z',
    status: 'draft',
  },
]
