import type { IPerson } from '~/implementation/interfaces/IPerson'
import type { IEducationDegree } from '~/implementation/interfaces/IEducationDegree'
import type { IAcademicDiscipline } from '~/implementation/interfaces/IAcademicDiscipline'

export interface IEducation {
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
}
