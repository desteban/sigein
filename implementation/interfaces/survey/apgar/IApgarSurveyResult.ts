import type { ISurvey } from '~/implementation/interfaces/ISurvey'

export interface IApgarSurveyResult {
  id: number
  survey_id: number
  total_score: number
  interpretation: string
  created_at: string | null
  updated_at: string | null

  // Relación con la encuesta
  survey: ISurvey
}
