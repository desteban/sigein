import axios from 'axios'
// import { useCookie } from '#app/composables/cookie'
// import { useEncryption } from '~/composables/useEncryption'
import { useRuntimeConfig } from '#app'
import { useAuthStore } from '~/stores/auth'

export const useApi = () => {
  const auth = useAuthStore()
  const config = useRuntimeConfig()
  const baseURL = `${config.public.urlBackEnd}/api/`
  // const { decryptInformation } = useEncryption()
  // const token = decryptInformation(useCookie('access_token').value)
  // console.log('la token value', token)
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: auth.access_token
        ? `${auth.token_type} ${auth.access_token}`
        : null
    }
  })

  instance.interceptors.response.use(
    response => {
      return response
    },
    async error => {
      if (error.response?.status === 401) {
        document.location.href = '/auth/login'
      }
      // const originalRequest = error.config;
      // const errMessage = error.response.data.message as string;
      // if (errMessage.includes('not logged in') && !originalRequest._retry) {
      //     originalRequest._retry = true;
      //     await refreshAccessTokenFn();
      //     return authApi(originalRequest);
      // }
      return Promise.reject(error)
    }
  )

  return instance
}
