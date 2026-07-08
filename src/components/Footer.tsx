import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../data/profile'

export function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {year} {profile.name}. 保留所有权利。
        </p>
        <Link to="/" className="back-to-top" onClick={scrollToTop}>
          返回顶部 ↑
        </Link>
      </div>
    </footer>
  )
}
