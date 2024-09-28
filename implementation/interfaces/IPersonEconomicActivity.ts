import type { IEconomicActivity } from '~/implementation/interfaces/IEconomicActivity'

export interface IPersonEconomicActivity {
  id: number | null
  person_id: number | null
  economic_activity_id: number | null
  economic_activity: IEconomicActivity | null
  start_date: string | null
  created_at: string | null
  updated_at: string | null
}
