import type { RouteRecordRaw } from 'vue-router'
import CommandAddress from '@/features/user/components/command/CommandAddress.vue'
import Payment from '@/features/user/components/command/CommandPayment.vue'
import Finish from '../components/command/CommandFinish.vue'
import CommandUserList from '@/features/user/components/profile/CommandUserList.vue'
import UpdatePasswordUser from '@/features/user/components/profile/UpdatePasswordUser.vue'
import CommandAddressForm from '@/features/user/templates/command-address-form/CommandAddressForm.vue'

export const USER_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '' },
  { path: '/command-address', component: CommandAddress },
  { path: '/payment', component: Payment },
  { path: '/finish', component: Finish },
  { path: '/command-user-list', component: CommandUserList },
  { path: '/edit/command-address/:id', component: CommandAddressForm },
  { path:'/update-password-user', component: UpdatePasswordUser }
]
