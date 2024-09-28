import { defineStore } from 'pinia'

interface ILoadingState {
  text: string
  percent: number
}

export const useLoadingStore = defineStore({
  id: 'loading',
  state: (): ILoadingState => ({
    text: '',
    percent: 0
  }),
  actions: {
    reset() {
      this.text = ''
      this.percent = 0
    }
  }
})
