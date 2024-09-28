import type { IPerson } from '~/implementation/interfaces/IPerson'
import type { IAccessOffer } from '~/implementation/interfaces/IAccessOffer'

export interface IOffer {
  id: number | null
  person_id: number | null
  name: string | null
  summary: string | null
  description: string | null
  start_date: string | null
  end_date: string | null
  status: string | null
  createdAt: string | null
  updatedAt: string | null
  access_offers: IAccessOffer[]
  active_access_offers: IAccessOffer[]
  person: IPerson | null
}
