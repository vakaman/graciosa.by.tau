import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/admin-layout.vue'
import Login from '@/pages/admin/login/login.vue'
import AuthLayout from '@/layouts/auth-layout.vue'
import Dashboard from '@/pages/admin/dashboard.vue'
import { isAuthenticated } from '@/services/authentication-service'
import Products from '@/pages/admin/products/products-management-page.vue'
import Categories from '@/pages/admin/products/categories-page.vue'
import ProductManagementPage from '@/pages/admin/products/product-management-page.vue'
import VariantManagementPage from '@/pages/admin/products/variant-manage-page.vue'

const routes = [
  {
    path: '/admin/login',
    component: AuthLayout,
    children: [
      { path: '', component: Login }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: Products },
      { path: 'products/categories', component: Categories },
      { path: 'products/:productId/manage', component: ProductManagementPage, props: true },
      { path: 'products/:productId/variant/:variantId/manage', component: VariantManagementPage, props: true }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/admin/login' }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      return next('/admin/login')
    }
  }
  next()
})

export default router
