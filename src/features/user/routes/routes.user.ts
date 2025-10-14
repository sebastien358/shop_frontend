import type { RouteRecordRaw } from 'vue-router'
import Profile from '@/features/user/components/profile/Profile.vue'
import Command from '@/features/user/components/command/Command.vue'
import Payment from '@/features/user/components/payment/Payment.vue'

export const USER_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/profile' },
  { path: '/profile', component: Profile },
  { path: '/command', component: Command },
  { path: '/payment', component: Payment }
]
