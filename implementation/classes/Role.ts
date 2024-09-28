import type { IRole } from '../interfaces/IRole.ts'
import type { IPermission } from '../interfaces/IPermission.ts'

export class Role implements IRole {
  id: number | null

  name: string

  guard_name: string

  created_at: string | null

  updated_at: string | null

  permissions: IPermission[]

  constructor(data: Partial<IRole> = {}) {
    this.id = data.id ?? null
    this.name = data.name ?? ''
    this.guard_name = data.guard_name ?? 'api'
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null
    this.permissions = data.permissions ?? []
  }
}
