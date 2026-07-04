import type { Profile } from '../types'

export const profile: Profile = {
  name: 'Colin Wang',
  initials: 'CW',
  tagline: '做东西的人 — 开发、设计、实验',
  bio: '我喜欢把想法变成可用的产品。这个网站是我存放各种创作的地方：Web 应用、小工具、设计实验，以及还在进行中的半成品。内容会持续更新。',
  email: 'hello@example.com',
  skills: [
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'UI 设计',
    '性能优化',
    '云端部署',
  ],
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/yourname',
      icon: '⌘',
    },
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:hello@example.com',
      icon: '✉',
    },
    {
      id: 'twitter',
      label: 'X / Twitter',
      href: 'https://x.com/yourname',
      icon: '𝕏',
    },
  ],
}
