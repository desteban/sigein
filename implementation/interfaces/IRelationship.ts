import type { IRelationshipType } from '~/implementation/interfaces/IRelationshipType'

export interface IRelationship {
  id: number | null
  person_id: number | null
  related_person_id: number | null
  relationship_type_id: number | null
  relationshipType: IRelationshipType | null
  created_at: string | null
  updated_at: string | null
}
