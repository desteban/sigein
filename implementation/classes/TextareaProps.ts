import type { ITextareaProps } from '../interfaces/ITextareaProps'

export class TextareaProps implements ITextareaProps {
  name?: string

  vid?: string

  rules?: any

  modelValue?: any

  active?: boolean

  appendIcon?: string

  appendInnerIcon?: string

  autofocus?: boolean

  autoGrow?: boolean

  baseColor?: string

  bgColor?: string

  clearable?: boolean

  propsClass?: string

  color?: string

  counter?: string | number | true

  density?: 'default' | 'comfortable' | 'compact'

  disabled?: boolean

  error?: boolean

  errorMessages?: string | string[]

  flat?: boolean

  focused?: boolean

  hideDetails?: boolean | 'auto'

  hint?: string

  id?: string

  label?: string

  loading?: string | boolean

  maxRows?: string | number

  messages?: string | string[]

  noResize?: boolean

  persistentCounter?: boolean

  persistentHint?: boolean

  placeholder?: string

  prefix?: string

  prependIcon?: string

  prependInnerIcon?: string

  readonly?: boolean

  rounded?: string | number | boolean

  rows?: string | number

  singleLine?: boolean

  suffix?: string

  variant?:
    | 'outlined'
    | 'plain'
    | 'underlined'
    | 'filled'
    | 'solo'
    | 'solo-inverted'
    | 'solo-filled'

  emoji?: boolean

  labelOutside: boolean

  constructor(data: Partial<ITextareaProps> = {}) {
    this.name = data.name || ''
    this.vid = data.vid || ''
    this.rules = data.rules || ''
    this.modelValue = data.modelValue || null
    this.active = data.active || false
    this.appendIcon = data.appendIcon || undefined
    this.appendInnerIcon = data.appendInnerIcon || undefined
    this.autofocus = data.autofocus || false
    this.autoGrow = data.autoGrow || true
    this.baseColor = data.baseColor || undefined
    this.bgColor = data.bgColor || undefined
    this.clearable = data.clearable || false
    this.propsClass = data.propsClass || ''
    this.color = data.color || undefined
    this.counter = data.counter || undefined
    this.density = data.density || 'comfortable'
    this.disabled = data.disabled || false
    this.error = data.error || false
    this.errorMessages = data.errorMessages || []
    this.flat = data.flat || false
    this.focused = data.focused || false
    this.hideDetails = data.hideDetails || 'auto'
    this.hint = data.hint || undefined
    this.id = data.id || undefined
    this.label = data.label || undefined
    this.loading = data.loading || false
    this.maxRows = data.maxRows || undefined
    this.messages = data.messages || []
    this.noResize = data.noResize || false
    this.persistentCounter = data.persistentCounter || false
    this.persistentHint = data.persistentHint || false
    this.placeholder = data.placeholder || undefined
    this.prefix = data.prefix || undefined
    this.prependIcon = data.prependIcon || undefined
    this.prependInnerIcon = data.prependInnerIcon || undefined
    this.readonly = data.readonly || false
    this.rounded = data.rounded || false
    this.rows = data.rows || 3
    this.singleLine = data.singleLine || false
    this.suffix = data.suffix || undefined
    this.variant = data.variant || 'outlined'
    this.emoji = data.emoji || false
    this.labelOutside = data.labelOutside ?? true
  }
}
