import { defineStore } from 'pinia'

interface IRouterState {
  from: any
}

export const useRouterStore = defineStore({
  id: 'router',
  state: (): IRouterState => ({
    from: null
  })
})
