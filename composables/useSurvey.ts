import type { AxiosResponse } from 'axios'
import type { IApgarQuestion } from '~/implementation/interfaces/survey/apgar/IApgarQuestion'
import type { ISurvey } from '~/implementation/interfaces/ISurvey'

export function useSurvey() {
  const { snackbar } = useSnackbar()
  const api = useApi()

  const getApgarSurveyQuestions = async (): Promise<IApgarQuestion[]> => {
    return new Promise(resolve => {
      api
        .get('apgar-survey-questions')
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const saveSurvey = async (
    survey: ISurvey,
    surveyContent: IApgarQuestion[]
  ): Promise<ISurvey | null> => {
    console.log('survey antes', survey)
    return new Promise(resolve => {
      api
        .post('surveys', { survey, content: surveyContent })
        .then(({ data }) => resolve(data?.data || null))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve(null)
        })
    })
  }

  return {
    getApgarSurveyQuestions,
    saveSurvey
  }
}
