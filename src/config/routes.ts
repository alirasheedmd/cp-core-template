export const routes = {
  // Public routes
  home: '/',
  fireFighting: '/fire-fighting',
  fireAlarm: '/fire-alarm',
  fireExitDoors: '/fire-exit-doors',
  safetyEquipment: '/safety-equipment',
  lifeSafety: '/life-safety',
  trafficSafety: '/traffic-safety',
  catalog: '/catalog',
  contact: '/contact',

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
}
