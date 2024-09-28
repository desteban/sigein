import type { ILocationInfo } from '~/implementation/interfaces/ILocationInfo'
import type { ICountry } from '~/implementation/interfaces/ICountry'
import type { IState } from '~/implementation/interfaces/IState'
import type { ICity } from '~/implementation/interfaces/ICity'

export class LocationInfo implements ILocationInfo {
  id: number | null

  person_id: number | null

  country_id: number | null

  state_id: number | null

  city_id: number | null

  address: string | null

  postal_code: any | null

  phone_number: string | null

  phone_dial: string | null

  phone_iso: string | null

  country: ICountry | null

  state: IState | null

  city: ICity | null

  created_at: string | null

  updated_at: string | null

  constructor(data: Partial<ILocationInfo> = {}) {
    this.id = data.id ?? null
    this.person_id = data.person_id ?? null
    this.country_id = data.country_id ?? null
    this.state_id = data.state_id ?? null
    this.city_id = data.city_id ?? null
    this.address = data.address ?? null
    this.postal_code = data.postal_code ?? null
    this.phone_number = data.phone_number ?? null
    this.phone_dial = data.phone_dial ?? null
    this.phone_iso = data.phone_iso ?? null
    this.country = data.country ?? null
    this.state = data.state ?? null
    this.city = data.city ?? null
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null
  }
}
