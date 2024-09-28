import type { IOffer } from '~/implementation/interfaces/IOffer'
import type { IPerson } from '~/implementation/interfaces/IPerson'
import type { IAccessOffer } from '~/implementation/interfaces/IAccessOffer'

export class AccessOffer {
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

  constructor(data: Partial<IAccessOffer> = {}) {
    this.id = data.id ?? null
    this.type = data.type ?? null
    this.status = data.status ?? 'active'
    this.observations = data.observations ?? null
    this.document = data.document ?? null
    this.offer_id = data.offer_id ?? null
    this.person_id = data.person_id ?? null
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null
    this.offer = data.offer ?? null
    this.person = data.person ?? null
  }
}
