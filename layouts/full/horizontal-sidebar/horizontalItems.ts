export interface menu {
  header?: string
  title?: string
  icon?: any
  to?: string
  divider?: boolean
  chip?: string
  chipColor?: string
  chipVariant?: string
  chipIcon?: string
  children?: menu[]
  disabled?: boolean
  subCaption?: string
  class?: string
  extraclass?: string
  type?: string
}

const horizontalItems: menu[] = [
  {
    title: 'Sample Page',
    icon: 'mdi-circle-double',
    to: '/'
  },
  {
    title: 'Menu Level',
    icon: 'mdi-menu',
    to: '#',
    children: [
      {
        title: 'Level 1',
        icon: 'mdi-circle-double',
        to: '/level1'
      },
      {
        title: 'Level 1',
        icon: 'mdi-circle-double',
        to: '/2level',
        children: [
          {
            title: 'Level 2',
            icon: 'mdi-circle-double',
            to: '/barry'
          },
          {
            title: 'Level 2',
            icon: 'mdi-circle-double',
            to: '/2.2level',
            children: [
              {
                title: 'Level 3',
                icon: 'mdi-circle-double',
                to: '/barry'
              }
            ]
          }
        ]
      }
    ]
  }
]

export default horizontalItems
