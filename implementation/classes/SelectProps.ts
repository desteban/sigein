import type { ISelectProps } from '../interfaces/ISelectProps.ts'

export class SelectProps implements ISelectProps {
  name: string

  vid: string

  rules: any

  type: 'text'

  typeComponent: 'autocomplete' | 'select' | 'combobox'

  modelValue: any

  active: boolean

  appendIcon?: string

  autofocus?: boolean

  autoSelectFirst?: boolean | 'exact'

  baseColor?: string

  bgColor?: string

  chips?: boolean

  clearable?: boolean

  clearOnSelect?: boolean

  closableChips?: boolean

  propsClass: string

  color?: string

  counter?: string | number | boolean

  customFilter?: any

  density: 'default' | 'comfortable' | 'compact'

  disabled: boolean

  error: boolean

  errorMessages: string | string[]

  flat: boolean

  focused: boolean

  hideDetails: boolean | 'auto'

  hideNoData: boolean

  hint?: string

  id?: string

  items: any[]

  itemTitle: any

  itemValue: any

  label?: string

  loading: string | boolean

  messages: string | string[]

  multiple: boolean

  noDataText: string

  noFilter: boolean

  openOnClear: boolean

  persistentCounter: boolean

  persistentHint: boolean

  placeholder?: string

  prefix?: string

  prependIcon?: string

  prependInnerIcon?: string

  readonly: boolean

  returnObject?: boolean

  rounded: string | number | boolean

  search?: string

  singleLine: boolean

  suffix?: string

  validateOn:
    | 'lazy'
    | 'blur'
    | 'input'
    | 'submit'
    | 'blur lazy'
    | 'input lazy'
    | 'submit lazy'
    | 'lazy blur'
    | 'lazy input'
    | 'lazy submit'

  variant:
    | 'outlined'
    | 'plain'
    | 'underlined'
    | 'filled'
    | 'solo'
    | 'solo-inverted'
    | 'solo-filled'

  // extra properties
  labelOutside: boolean

  objectValue?: any

  constructor(data: Partial<ISelectProps> = {}) {
    this.name = data.name ?? ''
    this.vid = data.vid ?? ''
    this.rules = data.rules ?? ''
    this.type = data.type ?? 'text'
    this.typeComponent = data.typeComponent ?? 'autocomplete'
    this.modelValue = data.modelValue ?? null
    this.active = data.active ?? false
    this.appendIcon = data.appendIcon
    this.autofocus = data.autofocus ?? false
    this.autoSelectFirst = data.autoSelectFirst ?? false
    this.baseColor = data.baseColor
    this.bgColor = data.bgColor ?? ''
    this.chips = data.chips ?? false
    this.clearable = data.clearable ?? true
    this.clearOnSelect = data.clearOnSelect ?? false
    this.closableChips = data.closableChips ?? true
    this.propsClass = data.propsClass ?? ''
    this.color = data.color
    this.counter = data.counter ?? false
    this.customFilter = data.customFilter
    this.density = data.density ?? 'comfortable'
    this.disabled = data.disabled ?? false
    this.error = data.error ?? false
    this.errorMessages = data.errorMessages ?? []
    this.flat = data.flat ?? false
    this.focused = data.focused ?? false
    this.hideDetails = data.hideDetails ?? 'auto'
    this.hideNoData = data.hideNoData ?? false
    this.hint = data.hint
    this.id = data.id
    this.items = data.items ?? []
    this.itemTitle = data.itemTitle ?? 'title'
    this.itemValue = data.itemValue ?? 'value'
    this.label = data.label
    this.loading = data.loading ?? false
    this.messages = data.messages ?? []
    this.multiple = data.multiple ?? false
    this.noDataText = data.noDataText ?? '$vuetify.noDataText'
    this.noFilter = data.noFilter ?? false
    this.openOnClear = data.openOnClear ?? false
    this.persistentCounter = data.persistentCounter ?? false
    this.persistentHint = data.persistentHint ?? false
    this.placeholder = data.placeholder
    this.prefix = data.prefix
    this.prependIcon = data.prependIcon
    this.prependInnerIcon = data.prependInnerIcon
    this.readonly = data.readonly ?? false
    this.returnObject = data.returnObject ?? false
    this.rounded = data.rounded ?? false
    this.search = data.search
    this.singleLine = data.singleLine ?? false
    this.suffix = data.suffix
    this.validateOn = data.validateOn ?? 'input'
    this.variant = data.variant ?? 'outlined'
    // extra properties
    this.labelOutside = data.labelOutside ?? true
    this.objectValue = data.objectValue
  }
}
