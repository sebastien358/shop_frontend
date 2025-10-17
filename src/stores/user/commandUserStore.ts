import { defineStore } from 'pinia'
import { axiosAddCommandUser, axiosGetCommandUser } from '@/shared/services/user/command.service.ts'

export const useCommandUserStore = defineStore('commandUser', ({
  state: () => ({
    command: []
  }),
  getters: {
    totalPrice(state) {
      const initialValue = 0
      return state.command[0].commandItems.reduce((acc, product) => acc + product.price * product.quantity, initialValue)
    }
  },  
  actions: {
    async getCommandUser() {
      try {
        const response = await axiosGetCommandUser()
        if (response) {
          const commands = Array.isArray(response) ? response : [response]
          this.command = commands
          console.log(this.command)
        } else {
          console.log('La response est vide')
        }
      } catch(e) {
        console.error(e)
      }
    },
    async addCommandAddress(dataAddress) {
      try {
        const response = await axiosAddCommandUser(dataAddress)
        if (response) {
          this.command.push(response)
          return response
        }
      } catch(e) {
        console.error(e)
      }
    }
  }
}))
