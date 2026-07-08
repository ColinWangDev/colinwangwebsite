import { Link } from 'react-router-dom'
import type { Project } from '../types'
import { statusLabels } from '../data/projects'

interface ProjectCardProps {
  project: Project
}

function isInternalLink(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasLinks = project.links.demo || project.links.repo

  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className={`status-badge status-badge--${project.status}`}>
          {statusLabels[project.status]}
        </span>
        <span className="project-year">{project.year}</span>
      </div>

      <div className="project-thumb" aria-hidden="true">
        <span className="project-thumb-text">{project.title.slice(0, 2)}</span>
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      {hasLinks && (
        <div className="project-links">
          {project.links.demo &&
            (isInternalLink(project.links.demo) ? (
              <Link className="project-link" to={project.links.demo}>
                打开 →
              </Link>
            ) : (
              <a
                className="project-link"
                href={project.links.demo}
                target="_blank"
                rel="noreferrer noopener"
              >
                预览 →
              </a>
            ))}
          {project.links.repo && (
            <a
              className="project-link"
              href={project.links.repo}
              target="_blank"
              rel="noreferrer noopener"
            >
              代码 →
            </a>
          )}
        </div>
      )}
    </article>
  )
}
