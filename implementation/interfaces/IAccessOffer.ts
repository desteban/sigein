import type { IPerson } from '~/implementation/interfaces/IPerson'
import type { IOffer } from '~/implementation/interfaces/IOffer'

export interface IAccessOffer {
  id: number | null
  type:
    | 'detailRequested'
    | 'fullDetail'
    | 'requested'
    | 'sent'
    | 'approved'
    | 'denied'
    | 'blocked'
    | null
  status: 'active' | 'inactive'
  observations: string | null
  document: string | null
  offer_id: number | null
  person_id: number | null
  created_at: string | null
  updated_at: string | null
  offer: IOffer | null
  person: IPerson | null
}
