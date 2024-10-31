import type { IHeader } from './IHeader.ts'

export class Header implements IHeader {
  title: string

  align: 'start' | 'end' | 'center'

  sortable: boolean

  key: string

  readonly cellProps:
    | {
        [p: string]: any
      }
    | ((
        data: Pick<any, 'value' | 'item' | 'index' | 'internalItem'>
      ) => Record<string, any>)
    | undefined

  readonly children: readonly any[] | undefined

  readonly filter: any

  readonly fixed: boolean | undefined

  readonly headerProps: { [p: string]: any } | undefined

  readonly maxWidth: string | undefined

  readonly minWidth: string | undefined

  readonly mobile: boolean | undefined

  readonly nowrap: boolean | undefined

  readonly sort: any

  readonly sortRaw: any

  readonly value: any

  readonly width: string | number | undefined

  constructor(data: Partial<IHeader> = {}) {
    this.title = data.title ?? ''
    this.align = data.align ?? 'start'
    this.sortable = data.sortable ?? false
    this.key = data.key ?? ''
  }
}
