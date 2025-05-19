export const routes = {
  // Public routes
  home: '/',
  dynamicCategory: {
    category: (categorySlug: string) => `/collections/${categorySlug}`,
  },
  dynamicProduct: {
    product: (productSlug: string) => `/products/${productSlug}`,
  },
  dynamicOrder: {
    order: (orderId: string) => `/order-confirmation/${orderId}`,
  },
  contact: '/contact',
  collections: '/collections',
  cart: '/cart',
  catalog: '/collections/all',
  checkout: '/checkout',
  orderConfirmation: '/order-confirmation',
  profile: '/account/profile',

  // Admin routes
  admin: {
    dashboard: '/admin/dashboard',
    orders: '/admin/orders',
    products: '/admin/products',
    settings: '/admin/settings',
    signin: '/admin/signin',
    // Dynamic routes
    orderEdit: (orderId: string) => `/admin/orders/${orderId}/edit`,
    productEdit: (productId: string) => `/admin/products/${productId}`,
    addProduct: '/admin/products/add',
    // Helper functions for dynamic routes
    orderDetails: (orderId: string) => `/admin/orders/${orderId}`,
  },

  // Footer
  footer: {
    refundPolicy: '#',
    privacyPolicy: '#',
    termsOfService: '#',
    shippingPolicy: '#',
    contactInformation: '#',
  },
}
