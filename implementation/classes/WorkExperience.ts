import type { IWorkExperience } from '~/implementation/interfaces/IWorkExperience'
import type { IPerson } from '~/implementation/interfaces/IPerson'
import type { IType } from '~/implementation/interfaces/IType'

export class WorkExperience implements IWorkExperience {
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

  constructor(data: Partial<IWorkExperience> = {}) {
    this.id = data.id ?? null
    this.person_id = data.person_id ?? null
    this.title = data.title ?? null
    this.description = data.description ?? null
    this.start_date = data.start_date ?? null
    this.end_date = data.end_date ?? null
    this.company_text = data.company_text ?? null
    this.position_text = data.position_text ?? null
    this.company_id = data.company_id ?? null
    this.company = data.company ?? null
    this.position_id = data.position_id ?? null
    this.position = data.position ?? null
    this.job_type_id = data.job_type_id ?? null
    this.job_type = data.job_type ?? null
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null
  }
}
