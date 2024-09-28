import { defineRule, Form, Field, configure } from 'vee-validate'
import { required, email, min, max, confirmed, url } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import es from '@vee-validate/i18n/dist/locale/es.json'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('VeeForm', Form)
  nuxtApp.vueApp.component('VeeField', Field)
  configure({
    generateMessage: localize('es', { ...es })
  })
  defineRule('required', required)
  defineRule('email', email)
  defineRule('confirmed', confirmed)
  defineRule('min', min)
  defineRule('max', max)
  defineRule('url', url)

  defineRule('passwordStrength', (value: string) => {
    if (!value || !value.length) {
      return true
    }

    if (
      !/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value)
    ) {
      return 'La contraseña debe tener una letra mayúscula, una minúscula y un número'
    }
    return true
  })

  setLocale('es')
})
