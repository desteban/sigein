import type { IRole } from '@/implementation/interfaces/IRole'
import type { IPermission } from '@/implementation/interfaces/IPermission'

export interface IUser {
  id: number | null
  name: string | null
  email: string | null
  language: string
  privacy_policy: number
  active: number
  email_verified_at: any | null
  created_at: string | null
  updated_at: string | null
  roles: IRole[]
  permissions: IPermission[]
}
