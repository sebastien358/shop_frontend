import type { RouteRecordRaw } from 'vue-router'
import ProductForm from '@/features/admin/components/ProductForm.vue'

export const ADMIN_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/product-form' },
  { path: '/product-form', component: ProductForm }
]
