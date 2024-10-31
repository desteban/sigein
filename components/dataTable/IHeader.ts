export interface IHeader {
  readonly key:
    | 'data-table-group'
    | 'data-table-select'
    | 'data-table-expand'
    | string
    | undefined
  readonly value: any | undefined
  readonly title: string | undefined
  readonly fixed: boolean | undefined
  readonly align: 'start' | 'end' | 'center' | undefined
  readonly width: string | number | undefined
  readonly minWidth: string | undefined
  readonly maxWidth: string | undefined
  readonly nowrap: boolean | undefined
  readonly headerProps: { readonly [x: string]: any } | undefined
  readonly cellProps:
    | { readonly [x: string]: any }
    | ((
        data: Pick<any, 'value' | 'item' | 'index' | 'internalItem'>
      ) => Record<string, any>)
    | undefined
  readonly sortable: boolean | undefined
  readonly sort: any | undefined
  readonly sortRaw: any | undefined
  readonly filter: any | undefined
  readonly mobile: boolean | undefined
  readonly children: readonly any[] | undefined
}
