import  en  from "./locales/en.json";
import  es  from "./locales/es.json";
import { useLocale } from '~/composables/useLocale'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: useLocale(),
    messages: {
        en: en,
        es: es,
    },
}))
