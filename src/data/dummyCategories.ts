import { ICategory } from '@/types'

export const dummyCategories: ICategory[] = [
  {
    _id: '1',
    name: 'Shop all',
    slug: {
      current: 'shop-all',
      _type: 'slug',
    },
  },
  {
    _id: '2',
    name: 'Make up',
    slug: {
      current: 'make-up',
      _type: 'slug',
    },
    subcategories: [
      {
        _id: '2-1',
        name: 'Face',
        slug: {
          current: 'make-up-face',
          _type: 'slug',
        },
      },
      {
        _id: '2-2',
        name: 'Eyes',
        slug: {
          current: 'make-up-eyes',
          _type: 'slug',
        },
      },
      {
        _id: '2-3',
        name: 'Lips',
        slug: {
          current: 'make-up-lips',
          _type: 'slug',
        },
      },
    ],
  },
  {
    _id: '3',
    name: 'Mobile product / tools',
    slug: {
      current: 'mobile-product-tools',
      _type: 'slug',
    },
  },
  {
    _id: '4',
    name: 'Garden',
    slug: {
      current: 'garden',
      _type: 'slug',
    },
    subcategories: [
      {
        _id: '4-1',
        name: 'Plants',
        slug: {
          current: 'garden-plants',
          _type: 'slug',
        },
      },
      {
        _id: '4-2',
        name: 'Tools',
        slug: {
          current: 'garden-tools',
          _type: 'slug',
        },
      },
      {
        _id: '4-3',
        name: 'Decorations',
        slug: {
          current: 'garden-decorations',
          _type: 'slug',
        },
      },
    ],
  },
  {
    _id: '5',
    name: 'Bath',
    slug: {
      current: 'bath',
      _type: 'slug',
    },
  },
  {
    _id: '6',
    name: 'Health and care',
    slug: {
      current: 'health-and-care',
      _type: 'slug',
    },
    subcategories: [
      {
        _id: '6-1',
        name: 'Skincare',
        slug: {
          current: 'health-care-skincare',
          _type: 'slug',
        },
      },
      {
        _id: '6-2',
        name: 'Haircare',
        slug: {
          current: 'health-care-haircare',
          _type: 'slug',
        },
      },
      {
        _id: '6-3',
        name: 'Bodycare',
        slug: {
          current: 'health-care-bodycare',
          _type: 'slug',
        },
      },
    ],
  },
  {
    _id: '7',
    name: 'Kitchen',
    slug: {
      current: 'kitchen',
      _type: 'slug',
    },
  },
]
