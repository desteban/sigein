import type { IPerson } from '~/implementation/interfaces/IPerson'
import type { IType } from '~/implementation/interfaces/IType'
import type { IProfile } from '~/implementation/interfaces/IProfile'
import type { ILocationInfo } from '~/implementation/interfaces/ILocationInfo'
import { Profile } from '~/implementation/classes/Profile'
import { LocationInfo } from '~/implementation/classes/LocationInfo'
import type { IWorkExperience } from '~/implementation/interfaces/IWorkExperience'
import type { IEducation } from '~/implementation/interfaces/IEducation'
import type { IPersonEconomicActivity } from '~/implementation/interfaces/IPersonEconomicActivity'
import type { IUser } from '~/implementation/interfaces/IUser'
import type { Offer } from '~/implementation/classes/Offer'

export class Person implements IPerson {
  id: number | null

  type: 'natural' | 'legal'

  identification: string | null

  first_name: string | null

  second_name: string | null

  first_last_name: string | null

  second_last_name: string | null

  business_name: string | null

  is_educational_institution: number

  created_at: string | null

  updated_at: string | null

  identification_type_id: number | null

  identification_type: IType | null

  profile_id: number | null

  profile: IProfile

  location_info_id: number | null

  location_info: ILocationInfo

  work_experiences: IWorkExperience[]

  educations: IEducation[]

  person_economic_activities: IPersonEconomicActivity[]

  offers: Offer[]

  user_id: number | null

  user: IUser | null

  constructor(data: Partial<IPerson> = {}) {
    this.id = data.id ?? null
    this.type = data.type ?? 'natural'
    this.identification = data.identification ?? null
    this.first_name = data.first_name ?? null
    this.second_name = data.second_name ?? null
    this.first_last_name = data.first_last_name ?? null
    this.second_last_name = data.second_last_name ?? null
    this.business_name = data.business_name ?? null
    this.is_educational_institution = data.is_educational_institution ?? 0
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null
    this.identification_type_id = data.identification_type_id ?? null
    this.identification_type = data.identification_type ?? null
    this.profile_id = data.profile_id ?? null
    this.profile = new Profile(data.profile ?? {})
    this.location_info_id = data.location_info_id ?? null
    this.location_info = new LocationInfo(data.location_info ?? {})
    this.work_experiences = data.work_experiences ?? []
    this.educations = data.educations ?? []
    this.person_economic_activities = data.person_economic_activities ?? []
    this.offers = data.offers ?? []
    this.user_id = data.user_id ?? null
    this.user = data.user ?? null
  }
}
