import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { User } from '@/implementation/classes/User'
import type { IUser } from '@/implementation/interfaces/IUser'

interface IAuthState {
  token_type: string
  access_token: string
  expires_at: string
  user: IUser | null
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): IAuthState => ({
    token_type: '',
    access_token: '',
    expires_at: '',
    user: null
  }),
  actions: {
    async login(user: {
      email: string
      password: string
      remember_me: boolean
    }) {
      const api = useApi()
      return new Promise((resolve, reject) => {
        api
          .post('login', user)
          .then(({ data }) => {
            console.log('la data del login', data)
            this.token_type = data.token_type
            this.access_token = data.token
            resolve(true)
          })
          .catch(error => reject(error))
      })
    },
    async register(newUser: {
      name: string
      email: string
      password: string
      password_confirmation: string
    }) {
      const api = useApi()
      return new Promise((resolve, reject) => {
        api
          .post('register', newUser)
          .then(({ data }) => {
            console.log('la data del register', data)
            this.token_type = data.token_type
            this.access_token = data.token
            resolve(true)
          })
          .catch(error => reject(error))
      })
    },
    async logout() {
      const api = useApi()
      return new Promise((resolve, reject) => {
        api
          .post('logout')
          .then(() => {
            this.token_type = ''
            this.access_token = ''
            this.user = null
            resolve(true)
          })
          .catch(error => reject(error))
      })
    },
    async changePassword(data: {
      current_password: string
      new_password: string
      new_password_confirmation: string
    }) {
      const api = useApi()
      return new Promise((resolve, reject) => {
        api
          .post('password/change', data)
          .then(() => {
            resolve(true)
          })
          .catch(error => reject(error))
      })
    },
    async forgotPassword(data: { email: string }) {
      const api = useApi()
      return new Promise((resolve, reject) => {
        api
          .post('password/email', data)
          .then(() => {
            resolve(true)
          })
          .catch(error => reject(error))
      })
    },
    async resetPassword(data: {
      email: string
      password: string
      password_confirmation: string
      token: string
    }) {
      const api = useApi()
      return new Promise((resolve, reject) => {
        api
          .post('password/reset', data)
          .then(() => {
            resolve(true)
          })
          .catch(error => reject(error))
      })
    },
    async verifyToken(data: { token: string; email: string }) {
      const api = useApi()
      return new Promise((resolve, reject) => {
        api
          .post('password/reset/verify-token', data)
          .then(() => {
            resolve(true)
          })
          .catch(error => reject(error))
      })
    },
    async currentUser() {
      const api = useApi()
      return new Promise((resolve, reject) => {
        api
          .get('current-user')
          .then(({ data }) => {
            console.log('la data del user', data)
            this.user = new User(data.user)
            resolve(true)
          })
          .catch(error => reject(error))
      })
    }
  },
  persist: {
    storage: persistedState.localStorage
  }
})
