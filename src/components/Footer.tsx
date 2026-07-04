import type { MouseEvent } from 'react'
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
        <a href="#" className="back-to-top" onClick={scrollToTop}>
          返回顶部 ↑
        </a>
      </div>
    </footer>
  )
}
