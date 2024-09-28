import type { IPerson } from '~/implementation/interfaces/IPerson'
import type { IType } from '~/implementation/interfaces/IType'

export interface IWorkExperience {
  id: number | null
  person_id: number | null
  title: string | null
  description: string | null
  start_date: string | null
  end_date: string | null
  company_text: string | null
  position_text: string | null
  company_id: number | null
  company: IPerson | null
  position_id: number | null
  position: IType | null
  job_type_id: number | null
  job_type: IType | null
  created_at: string | null
  updated_at: string | null
}
