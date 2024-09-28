import type { IPersonEconomicActivity } from '~/implementation/interfaces/IPersonEconomicActivity'
import type { IEconomicActivity } from '~/implementation/interfaces/IEconomicActivity'

export class PersonEconomicActivity implements IPersonEconomicActivity {
  id: number | null

  person_id: number | null

  economic_activity_id: number | null

  economic_activity: IEconomicActivity | null

  start_date: string | null

  created_at: string | null

  updated_at: string | null

  constructor(data: Partial<IPersonEconomicActivity> = {}) {
    this.id = data.id ?? null
    this.person_id = data.person_id ?? null
    this.economic_activity_id = data.economic_activity_id ?? null
    this.economic_activity = data.economic_activity ?? null
    this.start_date = data.start_date ?? null
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null
  }
}
