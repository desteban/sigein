export interface ISnackbarState {
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
  reference?: string
  list?: string[]
  code?: number
  timeout: number
}
