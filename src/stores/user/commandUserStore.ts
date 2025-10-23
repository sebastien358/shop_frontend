import { defineStore } from 'pinia'
import { axiosAddCommandUser, axiosGetCommandUser, axiosGetCommandUserList } from '@/shared/services/user/command.service.ts'

export const useCommandUserStore = defineStore('commandUser', ({
  state: () => ({
    currentCommand: [],
    command: []
  }),
  actions: {
    async getCommandUser() {
      try {
        const response = await axiosGetCommandUser()
        if (response) {
          const command = Array.isArray(response) ? response : [response]
          this.currentCommand = command
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
    },
    async getCommandUserList() {
      try {
        const response = await axiosGetCommandUserList()
        if (response) {
          const commands = Array.isArray(response) ? response : [response]
          this.command = commands
          console.log(this.command)
          return response
        } else {
          console.log('La response est vide')
        }
      } catch(e) {
        console.error(e)
      }
    }
  }
}))
