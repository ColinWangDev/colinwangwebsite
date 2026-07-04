import { useState, type FormEvent } from 'react'
import { profile } from '../data/profile'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (form: HTMLFormElement) => {
    const data = new FormData(form)
    const next: Record<string, string> = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (!name) next.name = '请填写姓名'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = '邮箱格式不正确'
    if (!message) next.message = '请填写留言'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!validate(form)) return

    setStatus('sending')
    // 原型阶段：模拟提交。上线时可接入 Formspree 等第三方服务
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
    form.reset()
    setErrors({})
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">Contact</span>
          <h2 className="section-title">联系方式</h2>
        </div>

        <div className="contact-grid">
          <form className="contact-form card" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label htmlFor="name">姓名</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="你的名字"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>

            <div className="form-row">
              <label htmlFor="email">邮箱</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>

            <div className="form-row">
              <label htmlFor="message">留言</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="想合作、咨询，或者只是打个招呼……"
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="field-error">{errors.message}</p>}
            </div>

            <div className="form-actions">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? '发送中…' : '发送留言'}
              </button>
              {status === 'success' && (
                <p className="form-status form-status--success" role="status">
                  已发送！（原型演示，实际未投递）
                </p>
              )}
            </div>
          </form>

          <div className="contact-aside">
            <ul className="social-list card">
              {profile.socials.map((social) => (
                <li key={social.id}>
                  <a
                    className="social-link"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="social-icon" aria-hidden="true">
                      {social.icon}
                    </span>
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="card contact-note">
              <p>
                也可以直接发邮件到{' '}
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
              <p className="muted">
                表单目前是前端演示。需要真正收件时，可接入 Formspree 或部署平台的表单功能。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
