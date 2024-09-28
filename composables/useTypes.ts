import type { AxiosResponse } from 'axios'
import { allCountries } from 'country-telephone-data'
import facebookImage from 'assets/images/svgs/social/facebook.svg'
import linkedinImage from 'assets/images/svgs/social/linkedin.svg'
import xImage from 'assets/images/svgs/social/x.svg'
import instagramImage from 'assets/images/svgs/social/instagram.svg'
import youtubeImage from 'assets/images/svgs/social/youtube.svg'
import tiktokImage from 'assets/images/svgs/social/tiktok.svg'
import discordImage from 'assets/images/svgs/social/discord.svg'
import websiteImage from 'assets/images/svgs/social/dribbble.svg'
import profileBg from '@/assets/images/backgrounds/profilebg.jpg'
import UserImage from '@/assets/images/profile/user-1.jpg'
import type { IType } from '~/implementation/interfaces/IType'
import type { IEconomicSector } from '~/implementation/interfaces/IEconomicSector'
import type { ICountry } from '~/implementation/interfaces/ICountry'
import type { IState } from '~/implementation/interfaces/IState'
import type { ICity } from '~/implementation/interfaces/ICity'
import type { IAcademicDiscipline } from '~/implementation/interfaces/IAcademicDiscipline'
import type { IEducationDegree } from '~/implementation/interfaces/IEducationDegree'
import type { IEconomicActivity } from '~/implementation/interfaces/IEconomicActivity'
import type { IStringIndexed } from '~/implementation/interfaces/IStringIndexed'

export function useTypes() {
  const { snackbar } = useSnackbar()
  const api = useApi()

  const getPhoneCountries = () => {
    return allCountries.map(country => {
      return {
        name: country.name,
        iso2: country.iso2,
        dialCode: country.dialCode
      }
    })
  }

  const getTypes = async (table: string): Promise<IType[]> => {
    return new Promise(resolve => {
      api
        .get('types/get-types-by-table', { params: { table } })
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const getEconomicSectors = async (): Promise<IEconomicSector[]> => {
    return new Promise(resolve => {
      api
        .get('economic-sectors')
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const getAcademicDisciplines = async (): Promise<IAcademicDiscipline[]> => {
    return new Promise(resolve => {
      api
        .get('academic-disciplines')
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const getEducationDegrees = async (): Promise<IEducationDegree[]> => {
    return new Promise(resolve => {
      api
        .get('education-degrees')
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const getEconomicActivities = async (): Promise<IEconomicActivity[]> => {
    return new Promise(resolve => {
      api
        .get('economic-activities')
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const getCountries = async (): Promise<ICountry[]> => {
    return new Promise(resolve => {
      api
        .get('countries')
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

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

  const getAccessOfferTypes = (): IStringIndexed[] => {
    return [
      { value: 'detailRequested', text: 'Detalle Solicitado' },
      { value: 'fullDetail', text: 'Detalle completo' },
      { value: 'requested', text: 'Solicitado' },
      { value: 'sent', text: 'Enviado' },
      { value: 'approved', text: 'Aprobado' },
      { value: 'denied', text: 'Denegado' },
      { value: 'blocked', text: 'Bloqueado' }
    ]
  }

  const getOfferStatus = (): IStringIndexed[] => {
    return [
      { value: 'active', text: 'Activa' },
      { value: 'inactive', text: 'Inactiva' },
      { value: 'canceled', text: 'Cancelada' },
      { value: 'completed', text: 'Completada' },
      { value: 'archived', text: 'Archivada' }
    ]
  }

  const getImageByName = (name: string): string => {
    if (name === 'facebook') return facebookImage
    if (name === 'linkedin') return linkedinImage
    if (name === 'youtube') return youtubeImage
    if (name === 'tiktok') return tiktokImage
    if (name === 'discord') return discordImage
    if (name === 'website') return websiteImage
    if (name === 'twitter') return xImage
    if (name === 'instagram') return instagramImage
    if (name === 'defaultBanner') return profileBg
    if (name === 'defaultUser') return UserImage
    return ''
  }

  return {
    getPhoneCountries,
    getTypes,
    getEconomicSectors,
    getAcademicDisciplines,
    getEducationDegrees,
    getEconomicActivities,
    getCountries,
    getStates,
    getCities,
    getAccessOfferTypes,
    getImageByName,
    getOfferStatus
  }
}
