import type { AxiosResponse } from 'axios'
import type { IPerson } from '~/implementation/interfaces/IPerson'

export function usePerson() {
  const { snackbar } = useSnackbar()
  const api = useApi()

  const getLocationPerson = (person: IPerson): string => {
    return [
      person.city?.name,
      person.state?.name,
      person.sector_type && person.sector
        ? [person.sector_type.name, person.sector.name].join(': ')
        : null
    ]
      .filter(x => x)
      .join(', ')
  }

  const getPerson = async (id: number): Promise<IPerson | null> => {
    return new Promise(resolve => {
      api
        .get(`persons/${id}`)
        .then((res: AxiosResponse) => resolve(res.data || null))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve(null)
        })
    })
  }

  const getPersons = async (): Promise<IPerson[]> => {
    return new Promise(resolve => {
      api
        .get('persons')
        .then((res: AxiosResponse) => resolve(res.data || []))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve([])
        })
    })
  }

  const savePerson = async (person: IPerson): Promise<IPerson | null> => {
    return new Promise(resolve => {
      api
        .post('persons', person)
        .then((res: AxiosResponse) => resolve(res.data || null))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve(null)
        })
    })
  }

  const updatePerson = async (person: IPerson): Promise<IPerson | null> => {
    return new Promise(resolve => {
      api
        .put(`persons/${person.id}`, person)
        .then((res: AxiosResponse) => resolve(res.data || null))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve(null)
        })
    })
  }

  const deletePerson = async (id: number): Promise<IPerson | null> => {
    return new Promise(resolve => {
      api
        .delete(`persons/${id}`)
        .then((res: AxiosResponse) => resolve(res.data || null))
        .catch((error: any) => {
          snackbar({ type: 'error', error })
          resolve(null)
        })
    })
  }

  return {
    getPerson,
    getPersons,
    savePerson,
    updatePerson,
    deletePerson,
    getLocationPerson
  }
}
