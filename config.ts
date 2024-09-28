export type ConfigProps = {
  Sidebar_drawer: any
  Customizer_drawer: boolean
  mini_sidebar: boolean
  setHorizontalLayout: boolean
  actTheme: string
  inputBg: string
  boxed: boolean
  setBorderCard: boolean
  language: string
}

const config: ConfigProps = {
  Sidebar_drawer: null,
  Customizer_drawer: false,
  mini_sidebar: false,
  setHorizontalLayout: false, // Horizontal layout
  actTheme: 'BLUE_THEME',
  inputBg: 'BLUE_THEME',
  boxed: true,
  setBorderCard: true,
  language: 'es'
}

export default config