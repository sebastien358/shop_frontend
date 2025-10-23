import type { RouteRecordRaw } from 'vue-router'
import Profile from '@/features/user/components/profile/Profile.vue'
import CommandAddress from '@/features/user/components/command/CommandAddress.vue'
import Payment from '@/features/user/components/command/CommandPayment.vue'
import Finish from '../components/command/CommandFinish.vue'
import CommandUserList from '@/features/user/components/profile/CommandUserList.vue'

export const USER_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/profile' },
  { path: '/profile', component: Profile },
  { path: '/command-address', component: CommandAddress },
  { path: '/payment', component: Payment },
  { path: '/finish', component: Finish },
  { path: '/command-user-list', component: CommandUserList }
]
