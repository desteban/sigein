import type { ITextProps } from '../interfaces/ITextProps'

export class TextProps implements ITextProps {
  name: string

  vid: string

  rules: any

  type:
    | 'text'
    | 'number'
    | 'email'
    | 'tel'
    | 'password'
    | 'search'
    | 'url'
    | 'date'

  modelValue: any

  active: boolean

  appendIcon?: string

  appendInnerIcon?: string

  autofocus?: boolean

  baseColor?: string

  bgColor?: string

  clearable?: boolean

  propsClass: string

  color?: string

  counter?: string | number | boolean

  density: 'default' | 'comfortable' | 'compact'

  disabled: boolean

  error: boolean

  errorMessages: string | string[]

  flat: boolean

  focused: boolean

  hideDetails?: boolean | 'auto'

  hint?: string

  id?: string

  label?: string

  loading: string | boolean

  messages: string | string[]

  persistentCounter: boolean

  persistentHint: boolean

  placeholder?: string

  prefix?: string

  prependIcon?: string

  prependInnerIcon?: string

  readonly: boolean

  rounded: string | number | boolean

  singleLine: boolean

  suffix?: string

  variant:
    | 'outlined'
    | 'plain'
    | 'underlined'
    | 'filled'
    | 'solo'
    | 'solo-inverted'
    | 'solo-filled'

  // extra properties
  autocomplete?: string

  step: number

  maxLength: number

  decimal: boolean

  upperCase: boolean

  lowerCase: boolean

  labelOutside: boolean

  constructor(data: Partial<ITextProps> = {}) {
    this.name = data.name ?? ''
    this.vid = data.vid ?? ''
    this.rules = data.rules ?? ''
    this.type = data.type ?? 'text'
    this.modelValue = data.modelValue ?? null
    this.active = data.active ?? false
    this.appendIcon = data.appendIcon
    this.appendInnerIcon = data.appendInnerIcon
    this.autofocus = data.autofocus ?? false
    this.baseColor = data.baseColor
    this.bgColor = data.bgColor ?? ''
    this.clearable = data.clearable ?? true
    this.propsClass = data.propsClass ?? ''
    this.color = data.color
    this.counter = data.counter ?? false
    this.density = data.density ?? 'comfortable'
    this.disabled = data.disabled ?? false
    this.error = data.error ?? false
    this.errorMessages = data.errorMessages ?? []
    this.flat = data.flat ?? false
    this.focused = data.focused ?? false
    this.hideDetails = data.hideDetails ?? 'auto'
    this.hint = data.hint
    this.id = data.id
    this.label = data.label
    this.loading = data.loading ?? false
    this.messages = data.messages ?? []
    this.persistentCounter = data.persistentCounter ?? false
    this.persistentHint = data.persistentHint ?? false
    this.placeholder = data.placeholder
    this.prefix = data.prefix
    this.prependIcon = data.prependIcon
    this.prependInnerIcon = data.prependInnerIcon
    this.readonly = data.readonly ?? false
    this.rounded = data.rounded ?? false
    this.singleLine = data.singleLine ?? false
    this.suffix = data.suffix
    this.variant = data.variant ?? 'outlined'
    // extra properties
    this.autocomplete = data.autocomplete
    this.step = data.step ?? 1
    this.maxLength = data.maxLength ?? 0
    this.decimal = data.decimal ?? false
    this.upperCase = data.upperCase ?? false
    this.lowerCase = data.lowerCase ?? false
    this.labelOutside = data.labelOutside ?? true
  }
}
