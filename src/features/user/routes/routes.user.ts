import type { RouteRecordRaw } from 'vue-router'
import Profile from '@/features/user/components/profile/Profile.vue'
import Command from '@/features/user/components/command/Command.vue'

export const USER_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/profile' },
  { path: '/profile', component: Profile },
  { path: '/command', component: Command }
]
