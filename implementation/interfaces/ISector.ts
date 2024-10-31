import type { ISectorType } from './ISectorType'

export interface ISector {
  id: number | null
  city_id: number | null
  sector_type_id: number | null
  name: string | null
  sectorType: ISectorType | null
  created_at: string | null
  updated_at: string | null
}
