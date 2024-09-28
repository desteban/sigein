import type { ILoadingProps } from '../interfaces/ILoadingProps.ts'

export class LoadingProps implements ILoadingProps {
  contained: boolean

  modelValue: boolean

  widthContent: string

  overlayColor: string

  constructor(data: Partial<ILoadingProps> = {}) {
    this.contained = data?.contained || false
    this.modelValue = data?.modelValue || false
    this.widthContent = data?.widthContent || '300px'
    this.overlayColor = data?.overlayColor || ''
  }
}
