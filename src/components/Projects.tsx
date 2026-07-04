import { useMemo, useState } from 'react'
import type { ProjectCategory } from '../types'
import { categoryLabels, projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

const categories: ProjectCategory[] = ['all', 'web', 'tool', 'design', 'other']

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>('all')

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((p) => p.tags.includes(filter)),
    [filter],
  )

  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">Works</span>
          <h2 className="section-title">作品展示</h2>
          <p className="section-desc">
            这里放你做过的各种东西 — 完成品、进行中和还在脑子里的想法。
          </p>
        </div>

        <div className="filters" role="group" aria-label="作品筛选">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${filter === cat ? ' is-active' : ''}`}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="project-grid" aria-live="polite">
          {filtered.length > 0 ? (
            filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="empty-state">这个分类下还没有项目。</p>
          )}
        </div>
      </div>
    </section>
  )
}
