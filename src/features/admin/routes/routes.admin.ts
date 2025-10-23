import type { RouteRecordRaw } from 'vue-router'
import ProductAdminForm from '@/features/admin/components/product/ProductAdminForm.vue'
import ProductAdminList from '@/features/admin/components/product/ProductAdminList.vue'

export const ADMIN_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/product-form' },
  { path: '/product-form', component: ProductAdminForm },
  { path: '/product-list', component: ProductAdminList }
]
