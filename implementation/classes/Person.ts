import type { IPerson } from '~/implementation/interfaces/IPerson'
import type { IIdentificationType } from '~/implementation/interfaces/IIdentificationType'
import type { IHousehold } from '~/implementation/interfaces/IHousehold'
import type { IRelationship } from '~/implementation/interfaces/IRelationship'
import type { ICie10 } from '~/implementation/interfaces/ICie10'
import type { ISectorType } from '~/implementation/interfaces/ISectorType'
import type { ISector } from '~/implementation/interfaces/ISector'

export class Person implements IPerson {
  id: number | null

  first_name: string | null

  middle_name: string | null

  first_surname: string | null

  second_surname: string | null

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

  // Relaciones
  identificationType: IIdentificationType | null

  household: IHousehold | null

  relationships: IRelationship[] | []

  cie10s: ICie10[] | []

  sectorType: ISectorType | null

  sector: ISector | null

  creator: IUser | null

  constructor(data: Partial<IPerson> = {}) {
    this.id = data.id ?? null
    this.first_name = data.first_name ?? null
    this.middle_name = data.middle_name ?? null
    this.first_surname = data.first_surname ?? null
    this.second_surname = data.second_surname ?? null
    this.identification_type_id = data.identification_type_id ?? null
    this.identification_number = data.identification_number ?? null
    this.sex = data.sex ?? null
    this.birth_date = data.birth_date ?? null
    this.address = data.address ?? null
    this.state_id = data.state_id ?? null
    this.city_id = data.city_id ?? null
    this.head_of_house = data.head_of_house ?? false
    this.household_id = data.household_id ?? null
    this.user_id = data.user_id ?? null
    this.sector_type_id = data.sector_type_id ?? null
    this.sector_id = data.sector_id ?? null
    this.phone = data.phone ?? null
    this.email = data.email ?? null
    this.blood_type = data.blood_type ?? null
    this.marital_status = data.marital_status ?? null
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null

    // Asignación de relaciones
    this.identificationType = data.identificationType ?? null
    this.household = data.household ?? null
    this.relationships = data.relationships ?? []
    this.cie10s = data.cie10s ?? []
    this.sectorType = data.sectorType ?? null
    this.sector = data.sector ?? null
    this.creator = data.creator ?? null
  }

  // Método helper para obtener nombre completo
  get fullName(): string {
    const names = [this.first_name, this.middle_name].filter(Boolean).join(' ')
    const surnames = [this.first_surname, this.second_surname]
      .filter(Boolean)
      .join(' ')
    return `${names} ${surnames}`.trim()
  }
}
