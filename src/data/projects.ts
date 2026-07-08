import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'p1',
    title: '个人博客系统',
    description: '基于静态生成的博客模版，支持暗色模式、标签分类与 RSS。',
    tags: ['web'],
    year: '2025',
    status: 'done',
    links: { demo: '#', repo: '#' },
  },
  {
    id: 'p2',
    title: '每日任务规划器',
    description: '根据今日可用工时，从待办池中自动挑选任务。数据保存在浏览器本地。',
    tags: ['tool'],
    year: '2026',
    status: 'wip',
    links: { demo: '/task-planner' },
  },
  {
    id: 'p3',
    title: '数据可视化实验',
    description: '用 Canvas 实现交互式图表与动画过渡，探索数据叙事的可能性。',
    tags: ['web', 'design'],
    year: '2024',
    status: 'done',
    links: { demo: '#', repo: '#' },
  },
  {
    id: 'p4',
    title: '品牌视觉探索',
    description: '一组 Logo 与配色方案的迭代记录，用于个人品牌建立。',
    tags: ['design'],
    year: '2024',
    status: 'idea',
    links: {},
  },
  {
    id: 'p5',
    title: '自动化部署脚本',
    description: '一键将静态站点部署到 GitHub Pages / Vercel 的 Shell 脚本。',
    tags: ['tool', 'other'],
    year: '2024',
    status: 'done',
    links: { repo: '#' },
  },
  {
    id: 'p6',
    title: '待命名项目',
    description: '一个还在构思中的想法，占位卡片 — 替换为真实项目即可。',
    tags: ['other'],
    year: '2026',
    status: 'idea',
    links: {},
  },
]

export const categoryLabels: Record<string, string> = {
  all: '全部',
  web: 'Web',
  tool: '工具',
  design: '设计',
  other: '其他',
}

export const statusLabels: Record<Project['status'], string> = {
  done: '已完成',
  wip: '进行中',
  idea: '构思中',
}
