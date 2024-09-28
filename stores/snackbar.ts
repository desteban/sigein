import { defineStore } from 'pinia'
import type { ISnackbarState } from '@/implementation/interfaces/ISnackbarState'

export const useSnackbarStore = defineStore({
  id: 'snackbar',
  state: (): ISnackbarState => ({
    type: 'info',
    message: '',
    reference: '',
    list: [],
    code: 0,
    timeout: 0
  }),
  actions: {
    setMessage(message: ISnackbarState) {
      if (message) {
        this.type = message.type
        this.message = message.message
        this.reference = message.reference ?? ''
        this.list = message.list ?? []
        this.code = message.code ?? 0
        this.timeout = message.timeout
      }
    }
  }
})
