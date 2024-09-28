export interface ITextareaProps {
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
  labelOutside?: boolean
}
