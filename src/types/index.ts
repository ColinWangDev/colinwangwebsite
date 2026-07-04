export type ProjectCategory = 'all' | 'web' | 'tool' | 'design' | 'other'

export interface Project {
  id: string
  title: string
  description: string
  tags: Exclude<ProjectCategory, 'all'>[]
  year: string
  status: 'done' | 'wip' | 'idea'
  links: {
    demo?: string
    repo?: string
  }
}

export interface SocialLink {
  id: string
  label: string
  href: string
  icon: string
}

export interface Profile {
  name: string
  initials: string
  tagline: string
  bio: string
  email: string
  skills: string[]
  socials: SocialLink[]
}
