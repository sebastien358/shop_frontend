import type { RouteRecordRaw } from 'vue-router'
import Profile from '@/features/user/views/Profile.vue'

export const USER_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/profile' },
  { path: '/profile', component: Profile }
]
