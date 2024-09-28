export interface IType {
  id: number | null
  table: string
  name: string
  description: string
  created_at: string | null
  updated_at: string | null
  type: IType | null
}
