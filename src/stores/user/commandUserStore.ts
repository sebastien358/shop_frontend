import { defineStore } from 'pinia'
import { axiosAddCommandUser } from '@/shared/services/user/command.service.ts'

export const useCommandUserStore = defineStore('commandUser', ({
  state: () => ({
    command: []
  }),
  actions: {
    async addCommandAddress(dataAddress) {
      try {
        return await axiosAddCommandUser(dataAddress)
      } catch(e) {
        console.error(e)
      }
    }
  }
}))
