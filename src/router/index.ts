import { createRouter, createWebHistory } from 'vue-router'
import Boutique from '@/features/boutique/Boutique.vue'
import Register from '@/features/boutique/components/auth/Register.vue'
import Login from '@/features/boutique/components/auth/Login.vue'
import { useAuthStore } from '@/stores/authStore.ts'
import Admin from '@/features/admin/Admin.vue'
import { ADMIN_ROUTES } from '@/features/admin/routes/routes.admin.ts'
import User from '@/features/user/User.vue'
import { USER_ROUTES } from '@/features/user/routes/routes.user.ts'
import RequestPassword from '@/features/boutique/components/auth/reset-password/RequestPassword.vue'
import ResetPassword from '@/features/boutique/components/auth/reset-password/ResetPassword.vue'

const routes = [
  { path: '/', redirect: '/boutique' },
  { path: '/boutique', component: Boutique },
  { path: '/register', name: 'register', component: Register },
  { path: '/login', name: 'login', component: Login },
  { path: '/request-password', component: RequestPassword },
  { path: '/reset-password/:token', component: ResetPassword },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
    component: Admin,
    children: ADMIN_ROUTES
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      requiresAuth: true,
      requiresUser: true
    },
    component: User, children: USER_ROUTES
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})  

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ path: '/login' })
  } else if (to.meta.requiresAdmin && !authStore.roleAdmin()) {
    next({ path: '/boutique' })
  } else if (to.meta.requiresUser && !authStore.roleUser()) {
    next({ path: '/boutique' })
  } else {
    next()
  }
})

export default router
