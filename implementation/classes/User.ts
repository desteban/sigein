import type { IUser } from '@/implementation/interfaces/IUser.ts'
import type { IRole } from '@/implementation/interfaces/IRole.ts'
import type { IPermission } from '@/implementation/interfaces/IPermission.ts'

export class User implements IUser {
  id: number | null

  name: string | null

  email: string | null

  language: string

  privacy_policy: number

  active: number

  email_verified_at: string | null

  created_at: string | null

  updated_at: string | null

  roles: IRole[]

  permissions: IPermission[]

  constructor(data: Partial<IUser> = {}) {
    this.id = data.id ?? null
    this.name = data.name ?? null
    this.email = data.email ?? null
    this.language = data.language ?? 'es'
    this.privacy_policy = data.privacy_policy ?? 0
    this.active = data.active ?? 1
    this.email_verified_at = data.email_verified_at ?? null
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null
    this.roles = data.roles ?? []
    this.permissions = data.permissions ?? []
  }
}
