import type { IRelationship } from '~/implementation/interfaces/IRelationship'
import type { IRelationshipType } from '~/implementation/interfaces/IRelationshipType'

export class Relationship implements IRelationship {
  id: number | null

  person_id: number | null

  related_person_id: number | null

  relationship_type_id: number | null

  relationshipType: IRelationshipType | null

  created_at: string | null

  updated_at: string | null

  constructor(data: Partial<IRelationship> = {}) {
    this.id = data.id ?? null
    this.person_id = data.person_id ?? null
    this.related_person_id = data.related_person_id ?? null
    this.relationship_type_id = data.relationship_type_id ?? null
    this.relationshipType = data.relationshipType ?? null
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null
  }
}
