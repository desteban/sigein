import type { IUser } from '~/implementation/interfaces/IUser'
import type { IIdentificationType } from '~/implementation/interfaces/IIdentificationType'
import type { IHousehold } from '~/implementation/interfaces/IHousehold'
import type { IRelationship } from '~/implementation/interfaces/IRelationship'
import type { ICie10 } from '~/implementation/interfaces/ICie10'
import type { ISectorType } from '~/implementation/interfaces/ISectorType'
import type { ISector } from '~/implementation/interfaces/ISector'
import type { ICity } from '~/implementation/interfaces/ICity'
import type { IState } from '~/implementation/interfaces/IState'
import type { ISurvey } from '~/implementation/interfaces/ISurvey'

export interface IPerson {
  id: number | null
  first_name: string | null
  middle_name: string | null
  first_surname: string | null
  second_surname: string | null
  full_name: string | null
  identification_type_id: number | null
  identification_number: string | null
  sex: string | null
  birth_date: string | null
  address: string | null
  state_id: number | null
  city_id: number | null
  head_of_house: boolean
  household_id: number | null
  user_id: number | null
  sector_type_id: number | null
  sector_id: number | null
  phone: string | null
  email: string | null
  blood_type: string | null
  marital_status: string | null
  created_at: string | null
  updated_at: string | null

  city: ICity | null
  state: IState | null
  identification_type: IIdentificationType | null
  household: IHousehold | null
  relationships: IRelationship[] | []
  cie10s: ICie10[] | []
  sector_type: ISectorType | null
  sector: ISector | null
  creator: IUser | null
  surveys: ISurvey[] | []
}
