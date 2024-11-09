import type { IApgarQuestion } from '~/implementation/interfaces/survey/apgar/IApgarQuestion'

export interface IApgarResponseOption {
  id: number
  question_id: number
  option_text: string
  option_value: number
  created_at: string | null
  updated_at: string | null

  // Relación con la pregunta de APGAR
  question: IApgarQuestion
}
