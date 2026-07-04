import { profile } from '../data/profile'

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <p className="hero-eyebrow">个人网站 · 原型</p>
          <h1 className="hero-title">
            你好，我是 <span className="text-accent">{profile.name}</span>
          </h1>
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              浏览作品
            </a>
            <a className="btn btn-ghost" href="#contact">
              联系我
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="avatar-ring">
            <div className="avatar">{profile.initials}</div>
          </div>
          <div className="hero-orbit hero-orbit--1" />
          <div className="hero-orbit hero-orbit--2" />
        </div>
      </div>
    </section>
  )
}
