export interface menu {
  header?: string
  title?: string
  icon?: any
  to?: string
  chip?: string
  chipBgColor?: string
  chipColor?: string
  chipVariant?: string
  chipIcon?: string
  children?: menu[]
  disabled?: boolean
  type?: string
  subCaption?: string
}

const sidebarItem: menu[] = [
  { header: 'Admin' },
  {
    title: 'Inicio',
    icon: 'mdi-google-chrome',
    to: '/'
  },
  {
    title: 'Usuarios',
    icon: 'mdi-account-group-outline',
    to: '/users/list'
  },
  {
    title: 'Roles',
    icon: 'mdi-account-switch-outline',
    to: '/roles/list'
  },
  {
    title: 'Items Geográficos',
    icon: 'mdi-menu',
    to: '#',
    children: [
      {
        title: 'Estados',
        icon: 'mdi-circle-outline',
        to: '/level1'
      },
      {
        title: 'Ciudades',
        icon: 'mdi-circle-outline',
        to: '/2level'
      }
    ]
  },
  {
    title: 'Disciplinas académicas',
    icon: 'mdi-star-outline',
    to: '/materialpro'
  },
  {
    title: 'Sectores económicos',
    icon: 'mdi-seal',
    to: '/materialpro'
  },
  {
    title: 'Actividades económicas',
    icon: 'mdi-emoticon-happy-outline',
    to: '/materialpro'
  },
  {
    title: 'Tipos de identificación',
    icon: 'mdi-star-outline',
    to: '/modernize'
  },
  {
    title: 'Tipos de empleo',
    icon: 'mdi-star-outline',
    to: '/modernize'
  }
  // {
  //   title: 'Disabled',
  //   icon: 'mdi-circle-off-outline',
  //   disabled: true,
  //   to: '/materialpro'
  // },
  // {
  //   title: 'Menu Level',
  //   icon: 'mdi-menu',
  //   to: '#',
  //   children: [
  //     {
  //       title: 'Level 1',
  //       icon: 'mdi-circle-outline',
  //       to: '/level1'
  //     },
  //     {
  //       title: 'Level 1',
  //       icon: 'mdi-circle-outline',
  //       to: '/2level',
  //       children: [
  //         {
  //           title: 'Level 2',
  //           icon: 'mdi-circle-outline',
  //           to: '/barry'
  //         },
  //         {
  //           title: 'Level 2',
  //           icon: 'mdi-circle-outline',
  //           to: '/2.2level',
  //           children: [
  //             {
  //               title: 'Level 3',
  //               icon: 'mdi-circle-outline',
  //               to: '/barry'
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },
]

export default sidebarItem
