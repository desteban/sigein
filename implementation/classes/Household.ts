import type { IHousehold } from '~/implementation/interfaces/IHousehold'

export class Household implements IHousehold {
  id: number | null

  address: string | null

  state_id: number | null

  city_id: number | null

  geolocation: string | null

  created_at: string | null

  updated_at: string | null

  constructor(data: Partial<IHousehold> = {}) {
    this.id = data.id ?? null
    this.address = data.address ?? null
    this.state_id = data.state_id ?? null
    this.city_id = data.city_id ?? null
    this.geolocation = data.geolocation ?? null
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null
  }
}
