export interface ISelectProps {
  name?: string
  vid?: string
  rules?: any
  type?: 'text'
  typeComponent?: 'autocomplete' | 'select' | 'combobox'
  modelValue?: any
  active?: boolean
  appendIcon?: string
  autofocus?: boolean
  autoSelectFirst?: boolean | 'exact'
  baseColor?: string
  bgColor?: string
  chips?: boolean
  clearable?: boolean
  clearOnSelect?: boolean
  closableChips?: boolean
  propsClass?: string
  color?: string
  counter?: string | number | boolean
  customFilter?: any
  density?: 'default' | 'comfortable' | 'compact'
  disabled?: boolean
  error?: boolean
  errorMessages?: string | string[]
  flat?: boolean
  focused?: boolean
  hideDetails?: boolean | 'auto'
  hideNoData?: boolean
  hideSelected?: boolean
  hint?: string
  id?: string
  items?: any[]
  itemTitle?: any
  itemValue?: any
  label?: string
  loading?: string | boolean
  messages?: string | string[]
  multiple?: boolean
  noDataText?: string
  noFilter?: boolean
  openOnClear?: boolean
  persistentCounter?: boolean
  persistentHint?: boolean
  placeholder?: string
  prefix?: string
  prependIcon?: string
  prependInnerIcon?: string
  readonly?: boolean
  returnObject?: boolean
  rounded?: string | number | boolean
  search?: string
  singleLine?: boolean
  suffix?: string
  validateOn?:
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
  variant?:
    | 'outlined'
    | 'plain'
    | 'underlined'
    | 'filled'
    | 'solo'
    | 'solo-inverted'
    | 'solo-filled'
  // extra properties
  labelOutside?: boolean
  objectValue?: any
}
