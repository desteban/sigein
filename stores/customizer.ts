import { defineStore } from 'pinia';
import config from '@/config'

const darkThemes = [
  'DARK_BLUE_THEME',
  'DARK_AQUA_THEME',
  'DARK_ORANGE_THEME',
  'DARK_PURPLE_THEME',
  'DARK_GREEN_THEME',
  'DARK_CYAN_THEME'
]

export const useCustomizerStore = defineStore({
  id: 'customizer',
  state: () => ({
    Sidebar_drawer: config.Sidebar_drawer,
    Customizer_drawer: config.Customizer_drawer,
    mini_sidebar: config.mini_sidebar,
    setHorizontalLayout: config.setHorizontalLayout, // Horizontal layout
    actTheme: config.actTheme,
    inputBg: config.inputBg,
    boxed: config.boxed,
    setBorderCard: config.setBorderCard,
    language: config.language
  }),

  getters: {
    isDarkTheme: state => darkThemes.includes(state.actTheme)
  },
  actions: {
    SET_SIDEBAR_DRAWER() {
      this.Sidebar_drawer = !this.Sidebar_drawer
    },
    SET_MINI_SIDEBAR(payload: any) {
      this.mini_sidebar = payload
    },
    SET_CUSTOMIZER_DRAWER(payload: any) {
      this.Customizer_drawer = payload
    },

    SET_LAYOUT(payload: any) {
      this.setHorizontalLayout = payload
    },
    SET_THEME(payload: any) {
      this.actTheme = payload
    },
    SET_CARD_BORDER(payload: any) {
      this.setBorderCard = payload
    }
  },
  persist: true
})
