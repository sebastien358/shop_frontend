import { defineStore } from 'pinia'
import {
  axiosEmailExistingLogin,
  axiosEmailExistingRegister,
  axiosLogin, axiosMeInfo,
  axiosRegister,
} from '@/shared/services/auth.service.ts'

const TOKEN_KEY = 'token'
const USER_ROLES = 'roles'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(TOKEN_KEY),
    isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
    roles: JSON.parse(localStorage.getItem(USER_ROLES) ?? '[]')
  }),
  actions: {
    async login(dataLogin) {
      try {
        const response = await axiosLogin(dataLogin)
        localStorage.setItem(TOKEN_KEY, response.token)
        this.token = response.token
        this.isLoggedIn = true
        await this.infoMe()
      } catch(e) {
        console.error(e)
      }
    },
    async infoMe() {
      try {
        const response = await axiosMeInfo()
        if (response && response.roles) {
          localStorage.setItem(USER_ROLES, JSON.stringify(response.roles))
          this.roles = response.roles
        } else {
          console.log('Réponse invalide')
        }
      } catch (e) {
        console.error(e)
      }
    },
    roleAdmin() {
      return this.roles.includes('ROLE_ADMIN')
    },
    roleUser() {
      return this.roles.includes('ROLE_USER')
    },
    async register(dataRegister) {
      try {
        return await axiosRegister(dataRegister)
      } catch(e) {
        console.error(e)
      }
    },
    async emailExistingRegister(dataRegister) {
      try {
        return await axiosEmailExistingRegister(dataRegister)
      } catch(e) {
        console.error(e)
      }
    },
    async emailExistingLogin(dataLogin) {
      try {
        return await axiosEmailExistingLogin(dataLogin)
      } catch(e) {
        console.error(e)
      }
    },
    logout() {
      this.token = null
      this.isLoggedIn = false
      this.roles = []
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_ROLES)
    }
  }
})
