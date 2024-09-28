import { ref } from 'vue'
import { useSnackbarStore } from '@/stores/snackbar'
import type { ISnackbarState } from '@/implementation/interfaces/ISnackbarState.ts'

export function useSnackbar() {
  const messageNotification = ref<ISnackbarState>()
  const snackbar = (data: any) => {
    const snackbarStore = useSnackbarStore()
    if (data.type === 'error') {
      let dataMessage: any = null
      let message: string
      let list: any[] = []
      if (data.error?.response?.data?.error) {
        message = data.error.response.data.error
      } else {
        dataMessage = data.error.response?.data?.message
        message =
          dataMessage && typeof dataMessage === 'string'
            ? dataMessage
            : data.error.message
        list = dataMessage && Array.isArray(dataMessage) ? dataMessage : []
      }
      messageNotification.value = {
        type: data.type,
        message,
        list,
        code: data.error?.response?.status,
        reference: data.reference || '',
        timeout: data.timeout || 7000
      }
      snackbarStore.setMessage(messageNotification.value)
    } else {
      messageNotification.value = {
        type: data.type,
        message: data.message,
        reference: data.reference || '',
        timeout: data.timeout || 7000
      }
      snackbarStore.setMessage(messageNotification.value)
    }
  }

  return {
    snackbar
  }
}
