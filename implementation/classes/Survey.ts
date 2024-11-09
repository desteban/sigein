import type { ISurvey } from '~/implementation/interfaces/ISurvey'
import type { ISurveyType } from '~/implementation/interfaces/ISurveyType'
import type { IPerson } from '~/implementation/interfaces/IPerson'
import type { IUser } from '~/implementation/interfaces/IUser'
import type { ISurveyRejectionReason } from '~/implementation/interfaces/ISurveyRejectionReason'
import type { IApgarSurveyResult } from '~/implementation/interfaces/survey/apgar/IApgarSurveyResult'

export class Survey implements ISurvey {
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

  apgar_results: IApgarSurveyResult | null

  constructor(data: Partial<ISurvey> = {}) {
    this.id = data.id || null
    this.person_id = data.person_id || null
    this.survey_type_id = data.survey_type_id || null
    this.surveyor_id = data.surveyor_id || null
    this.status = data.status || 'Activa'
    this.survey_date = data.survey_date || null
    this.observations = data.observations || null
    this.respondent_consent =
      'rejection_reason_id' in data
        ? data.rejection_reason_id !== null
          ? 0
          : 1
        : null
    this.rejection_reason_id = data.rejection_reason_id || null
    this.created_at = data.created_at || null
    this.updated_at = data.updated_at || null

    // Relaciones opcionales
    this.survey_type = data.survey_type || null
    this.person = data.person || null
    this.surveyor = data.surveyor || null
    this.rejection_reason = data.rejection_reason || null
    this.apgar_results = data.apgar_results || null
  }
}
