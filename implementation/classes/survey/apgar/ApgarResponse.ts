import type { IApgarResponse } from '~/implementation/interfaces/survey/apgar/IApgarResponse'
import type { ISurvey } from '~/implementation/interfaces/ISurvey'
import type { IApgarQuestion } from '~/implementation/interfaces/survey/apgar/IApgarQuestion'
import type { IApgarResponseOption } from '~/implementation/interfaces/survey/apgar/IApgarResponseOption'

export class ApgarResponse implements IApgarResponse {
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

  constructor(data: Partial<IApgarResponse> = {}) {
    this.id = data.id || null
    this.survey_id = data.survey_id || null
    this.question_id = data.question_id || null
    this.response_option_id = data.response_option_id || null
    this.created_at = data.created_at || null
    this.updated_at = data.updated_at || null

    // Relaciones opcionales
    this.survey = data.survey || null
    this.question = data.question || null
    this.response_option = data.response_option || null
  }
}
