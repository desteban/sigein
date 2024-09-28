import Cookie from 'cookie-universal'

export const useLocale = () => {
  const cookie = Cookie()
  return cookie.get('locale') || 'es'
}
