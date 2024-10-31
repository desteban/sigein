import type { ISector } from '~/implementation/interfaces/ISector'
import type { ISectorType } from '~/implementation/interfaces/ISectorType'

export class Sector implements ISector {
  id: number | null

  city_id: number | null

  sector_type_id: number | null

  name: string | null

  sectorType: ISectorType | null

  created_at: string | null

  updated_at: string | null

  constructor(data: Partial<ISector> = {}) {
    this.id = data.id ?? null
    this.city_id = data.city_id ?? null
    this.sector_type_id = data.sector_type_id ?? null
    this.name = data.name ?? null
    this.sectorType = data.sectorType ?? null
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null
  }
}
