import type { ISurvey } from '~/implementation/interfaces/ISurvey'
import type { IApgarQuestion } from '~/implementation/interfaces/survey/apgar/IApgarQuestion'
import type { IApgarResponseOption } from '~/implementation/interfaces/survey/apgar/IApgarResponseOption'

export interface IApgarResponse {
  id: number | null
  survey_id: number | null
  question_id: number | null
  response_option_id: number | null
  created_at: string | null
  updated_at: string | null

  // Relaciones
  survey: ISurvey | null
  question: IApgarQuestion | null
  response_option: IApgarResponseOption | null
}
