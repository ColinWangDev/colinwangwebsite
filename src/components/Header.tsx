import { useState } from 'react'
import { profile } from '../data/profile'
import { useTheme } from '../hooks/useTheme'

const navItems = [
  { href: '#about', label: '关于' },
  { href: '#projects', label: '作品' },
  { href: '#contact', label: '联系' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cycleTheme, themeLabel } = useTheme()

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#" onClick={closeMenu}>
          {profile.initials}
        </a>

        <nav className="site-nav" aria-label="主导航">
          <button
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="nav-list"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>

          <ul id="nav-list" className={`nav-list${menuOpen ? ' open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="theme-toggle"
          onClick={cycleTheme}
          aria-label={`切换主题，当前：${themeLabel}`}
          title={`主题：${themeLabel}`}
        >
          <span className="theme-icon" aria-hidden="true">
            ◐
          </span>
          <span className="theme-label">{themeLabel}</span>
        </button>
      </div>
    </header>
  )
}
