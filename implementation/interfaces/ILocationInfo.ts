import type { ICountry } from '~/implementation/interfaces/ICountry'
import type { IState } from '~/implementation/interfaces/IState'
import type { ICity } from '~/implementation/interfaces/ICity'

export interface ILocationInfo {
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
}
