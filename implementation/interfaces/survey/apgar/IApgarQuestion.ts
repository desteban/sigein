import type { ISurveyType } from '~/implementation/interfaces/ISurveyType'
import type { IApgarResponseOption } from '~/implementation/interfaces/survey/apgar/IApgarResponseOption'

export interface IApgarQuestion {
  id: number
  survey_type_id: number
  question_text: string
  model: number | null
  created_at: string | null
  updated_at: string | null

  survey_type: ISurveyType | null
  response_options: IApgarResponseOption[] | []
}
