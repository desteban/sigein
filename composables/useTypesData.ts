import type { AxiosResponse } from 'axios'
import profileBg from '@/assets/images/backgrounds/profilebg.jpg'
import UserImage from '@/assets/images/profile/user-1.jpg'
import type { IState } from '~/implementation/interfaces/IState'
import type { ICity } from '~/implementation/interfaces/ICity'
import type { IStringIndexed } from '~/implementation/interfaces/IStringIndexed'
import type { ISector } from '~/implementation/interfaces/ISector'
import type { ISectorType } from '~/implementation/interfaces/ISectorType'

export function useTypesData() {
  const { snackbar } = useSnackbar()
  const api = useApi()

  const getStates = async (countryId: number = 0): Promise<IState[]> => {
    if (!countryId) return []
    return new Promise(resolve => {
      api
        .get(`countries/${countryId}/states`)
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const getCities = async (stateId: number = 0): Promise<ICity[]> => {
    if (!stateId) return []
    return new Promise(resolve => {
      api
        .get(`states/${stateId}/cities`)
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const getSectors = async (
    cityId: number = 0,
    sectorTypeId: number = 0
  ): Promise<ISector[]> => {
    if (!cityId || !sectorTypeId) return []
    return new Promise(resolve => {
      api
        .get(`cities/${cityId}/sectors/${sectorTypeId}`)
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const getBloodTypes = (): IStringIndexed[] => {
    return [
      { value: 'A+', text: 'A+' },
      { value: 'A-', text: 'A-' },
      { value: 'B+', text: 'B+' },
      { value: 'B-', text: 'B-' },
      { value: 'AB+', text: 'AB+' },
      { value: 'AB-', text: 'AB-' },
      { value: 'O+', text: 'O+' },
      { value: 'O-', text: 'O-' }
    ]
  }

  const getMaritalStatus = (): IStringIndexed[] => {
    return [
      { value: 'Soltero', text: 'Soltero' },
      { value: 'Casado', text: 'Casado' },
      { value: 'Divorciado', text: 'Divorciado' },
      { value: 'Viudo', text: 'Viudo' },
      { value: 'Concubinato', text: 'Concubinato' },
      {
        value: 'Separación en proceso judicial',
        text: 'Separación en proceso judicial'
      }
    ]
  }

  const getSectorTypes = (): ISectorType[] => {
    return [
      { value: 1, text: 'Barrio' },
      { value: 2, text: 'Vereda' },
      { value: 3, text: 'Corregimiento' }
    ]
  }

  const getImageByName = (name: string): string => {
    if (name === 'defaultBanner') return profileBg
    if (name === 'defaultUser') return UserImage
    return ''
  }

  return {
    getStates,
    getCities,
    getSectors,
    getBloodTypes,
    getMaritalStatus,
    getSectorTypes,
    getImageByName
  }
}
