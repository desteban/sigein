import type { AxiosResponse } from 'axios'
import profileBg from '@/assets/images/backgrounds/profilebg.jpg'
import UserImage from '@/assets/images/profile/user-1.jpg'
import type { IState } from '~/implementation/interfaces/IState'
import type { ICity } from '~/implementation/interfaces/ICity'
import type { IStringIndexed } from '~/implementation/interfaces/IStringIndexed'
import type { ISector } from '~/implementation/interfaces/ISector'
import type { IIdentificationType } from '~/implementation/interfaces/IIdentificationType'

export function useTypesData() {
  const { snackbar } = useSnackbar()
  const api = useApi()

  const getStates = async (countryId: number = 1): Promise<IState[]> => {
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

  const getBloodTypes = async (): Promise<string[]> => {
    return new Promise(resolve => {
      api
        .get('blood-types')
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const getMaritalStatus = async (): Promise<string[]> => {
    return new Promise(resolve => {
      api
        .get('marital-status')
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const getIdentificationTypes = async (): Promise<IIdentificationType[]> => {
    return new Promise(resolve => {
      api
        .get('identification-types')
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const getSectorTypes = (): IStringIndexed[] => {
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
    getIdentificationTypes,
    getImageByName
  }
}
