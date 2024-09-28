import type { IAccessOffer } from '~/implementation/interfaces/IAccessOffer'
import type { IPerson } from '~/implementation/interfaces/IPerson'
import type { IOffer } from '~/implementation/interfaces/IOffer'

export class Offer implements IOffer {
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

  constructor(data: Partial<IOffer> = {}) {
    this.id = data.id ?? null
    this.person_id = data.person_id ?? null
    this.name = data.name ?? null
    this.summary = data.summary ?? null
    this.description = data.description ?? null
    this.start_date = data.start_date ?? null
    this.end_date = data.end_date ?? null
    this.status = data.status ?? null
    this.createdAt = data.createdAt ?? null
    this.updatedAt = data.updatedAt ?? null
    this.access_offers = data.access_offers ?? []
    this.active_access_offers = data.active_access_offers ?? []
    this.person = data.person ?? null
  }
}
