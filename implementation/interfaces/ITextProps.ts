export interface ITextProps {
  name?: string
  vid?: string
  rules?: any
  type?:
    | 'text'
    | 'number'
    | 'email'
    | 'tel'
    | 'password'
    | 'search'
    | 'url'
    | 'date'
  modelValue?: any
  active?: boolean
  appendIcon?: string
  appendInnerIcon?: string
  autofocus?: boolean
  baseColor?: string
  bgColor?: string
  clearable?: boolean
  propsClass?: string
  color?: string
  counter?: string | number | boolean
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
  messages?: string | string[]
  persistentCounter?: boolean
  persistentHint?: boolean
  placeholder?: string
  prefix?: string
  prependIcon?: string
  prependInnerIcon?: string
  readonly?: boolean
  rounded?: string | number | boolean
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
  // extra properties
  autocomplete?: string
  step?: number
  maxLength?: number
  decimal?: boolean
  upperCase?: boolean
  lowerCase?: boolean
  labelOutside?: boolean
}
