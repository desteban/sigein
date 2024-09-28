import type { IPermission } from './IPermission.ts'

export interface IRole {
  id: number | null
  name: string
  guard_name: string
  created_at: string | null
  updated_at: string | null
  permissions: IPermission[]
}
