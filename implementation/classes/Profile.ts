import type { IProfile } from '~/implementation/interfaces/IProfile'

export class Profile implements IProfile {
  id: number | null

  person_id: number | null

  header_image: string | null

  avatar: string | null

  title: string | null

  biography: string | null

  facebook: string | null

  twitter: string | null

  linkedin: string | null

  instagram: string | null

  youtube: string | null

  tiktok: string | null

  discord: string | null

  website: string | null

  created_at: string | null

  updated_at: string | null

  constructor(data: Partial<IProfile> = {}) {
    this.id = data.id ?? null
    this.person_id = data.person_id ?? null
    this.header_image = data.header_image ?? null
    this.avatar = data.avatar ?? null
    this.title = data.title ?? null
    this.biography = data.biography ?? null
    this.facebook = data.facebook ?? null
    this.twitter = data.twitter ?? null
    this.linkedin = data.linkedin ?? null
    this.instagram = data.instagram ?? null
    this.youtube = data.youtube ?? null
    this.tiktok = data.tiktok ?? null
    this.discord = data.discord ?? null
    this.website = data.website ?? null
    this.created_at = data.created_at ?? null
    this.updated_at = data.updated_at ?? null
  }
}
