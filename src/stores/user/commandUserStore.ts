import { defineStore } from 'pinia'
import { axiosAddCommandUser,
  axiosEditCommandUserAddress, axiosGetCommandUser, axiosGetCommandUserList, axiosGetCurrentUserId } from '@/shared/services/user/command.service.ts'

export const useCommandUserStore = defineStore('commandUser', ({
  state: () => ({
    currentCommand: [],
    currentCommandId: 0,
    command: []
  }),
  actions: {
    async getCommandUser() {
      try {
        const response = await axiosGetCommandUser()
        if (response) {
          const command = Array.isArray(response) ? response : [response]
          this.currentCommand = command
          this.currentCommandId = this.currentCommand[0].id
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
          return response
        } else {
          console.log('La response est vide')
        }
      } catch(e) {
        console.error(e)
      }
    },
    async getCurrentCommand(id: number) {
      try {
        return await axiosGetCurrentUserId(id)
      } catch(e) {
        console.error(e)
      }
    },
    async editCommandAddressUser(dataAddress, id: number) {
      try {
        const response = await axiosEditCommandUserAddress(dataAddress, id)
        if (response) {
          const stateCommandIndex = this.currentCommand.findIndex((c) => c.id === response.id)
          this.currentCommand[stateCommandIndex] = response
          return response
        }
      } catch(e) {
        console.error(e)
      }
    }
  }
}))
