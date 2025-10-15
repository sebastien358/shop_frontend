import { defineStore } from 'pinia'
import { axiosAddCommandUser } from '@/shared/services/user/command.service.ts'

export const useCommandUserStore = defineStore('commandUser', ({
  state: () => ({
    command: []
  }),
  actions: {
    async addCommandAddress(dataAddress) {
      try {
        const response = await axiosAddCommandUser(dataAddress)
        if (response) {
          return response
        }
      } catch(e) {
        console.error(e)
      }
    }
  }
}))
