import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Login from '@/pages/admin/login/Login.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import Dashboard from '@/pages/admin/Dashboard.vue'
import { isAuthenticated } from '@/services/authService'
import Products from '@/pages/admin/products/Products.vue'
import Categories from '@/pages/admin/products/Categories.vue'


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
      { path: 'products/categories', component: Categories }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/admin/login' }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 🔐 Proteção global aqui:
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      return next('/admin/login')
    }
  }
  next()
})

export default router
