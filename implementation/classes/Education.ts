import type { IEducation } from '~/implementation/interfaces/IEducation'
import type { IPerson } from '~/implementation/interfaces/IPerson'
import type { IEducationDegree } from '~/implementation/interfaces/IEducationDegree'
import type { IAcademicDiscipline } from '~/implementation/interfaces/IAcademicDiscipline'

export class Education implements IEducation {
  id: number | null

  person_id: number | null

  start_date: string | null

  end_date: string | null

  description: string | null

  educational_institution_text: string | null

  education_degree_text: string | null

  academic_discipline_text: string | null

  educational_institution_id: number | null

  educational_institution: IPerson | null

  education_degree_id: number | null

  education_degree: IEducationDegree | null

  academic_discipline_id: number | null

  academic_discipline: IAcademicDiscipline | null

  created_at: string | null

  updated_at: string | null

  constructor(data: Partial<IEducation> = {}) {
    this.id = data.id ?? null
    this.person_id = data.person_id ?? null
    this.start_date = data.start_date ?? null
    this.end_date = data.end_date ?? null
    this.description = data.description ?? null
    this.educational_institution_text =
      data.educational_institution_text ?? null
    this.education_degree_text = data.education_degree_text ?? null
    this.academic_discipline_text = data.academic_discipline_text ?? null
    this.educational_institution_id = data.educational_institution_id ?? null
    this.educational_institution = data.educational_institution ?? null
    this.education_degree_id = data.education_degree_id ?? null
    this.education_degree = data.education_degree ?? null
    this.academic_discipline_id = data.academic_discipline_id ?? null
    this.academic_discipline = data.academic_discipline ?? null
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null
  }
}
