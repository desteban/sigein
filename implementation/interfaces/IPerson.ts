import type { IProfile } from '~/implementation/interfaces/IProfile'
import type { IType } from '~/implementation/interfaces/IType'
import type { ILocationInfo } from '~/implementation/interfaces/ILocationInfo'
import type { IWorkExperience } from '~/implementation/interfaces/IWorkExperience'
import type { IEducation } from '~/implementation/interfaces/IEducation'
import type { IPersonEconomicActivity } from '~/implementation/interfaces/IPersonEconomicActivity'
import type { IUser } from '~/implementation/interfaces/IUser'
import type { Offer } from '~/implementation/classes/Offer'

export interface IPerson {
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
}
