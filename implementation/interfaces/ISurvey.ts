import type { IUser } from '~/implementation/interfaces/IUser'
import type { IPerson } from '~/implementation/interfaces/IPerson'
import type { ISurveyType } from '~/implementation/interfaces/ISurveyType'
import type { ISurveyRejectionReason } from '~/implementation/interfaces/ISurveyRejectionReason'
import type { IApgarSurveyResult } from '~/implementation/interfaces/survey/apgar/IApgarSurveyResult'

export interface ISurvey {
  id: number | null
  person_id: number | null
  survey_type_id: number | null
  surveyor_id: number | null
  status: string | null // Status puede ser 'active', 'completed', 'rejected', etc.
  survey_date: string | null // Fecha de diligenciamiento
  observations: string | null // Observaciones
  respondent_consent: number | null // Consentimiento del encuestado
  rejection_reason_id: number | null // Motivo de rechazo
  created_at: string | null
  updated_at: string | null

  // Relaciones
  survey_type: ISurveyType | null
  person: IPerson | null
  surveyor: IUser | null
  rejection_reason: ISurveyRejectionReason | null

  // relaciones apgar
  apgar_results: IApgarSurveyResult | null
}
