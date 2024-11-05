// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { useLocale } from './composables/useLocale'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  build: {
    transpile: ['vuetify']
  },
  modules: [
    '@nuxtjs/i18n',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        if (config.plugins) config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ],
    '@pinia-plugin-persistedstate/nuxt'
  ],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: useLocale(),
    locales: [
      {
        icon: 'flag-icon-us',
        code: 'en',
        name: 'English',
        short: '(US)'
      },
      {
        icon: 'flag-icon-es',
        code: 'es',
        name: 'Español'
      }
    ],
    vueI18n: './i18n.config.ts'
  },
  plugins: [
    { src: '~/plugins/plugins.js', mode: 'client' },
    { src: '~/plugins/veeValidate.ts', mode: 'client' }
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  css: ['@/assets/scss/style.scss', 'flag-icons'],
  app: {
    head: {
      link: [
        {
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap',
          rel: 'stylesheet'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      urlBackEnd: process.env.BACKEND_URL || 'http://localhost:8000'
    }
  }
})
