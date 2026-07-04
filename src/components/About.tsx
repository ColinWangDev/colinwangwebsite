import { profile } from '../data/profile'

export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-heading">
          <span className="section-label">About</span>
          <h2 className="section-title">关于我</h2>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p className="lead">{profile.bio}</p>
            <p className="muted">
              这个页面目前是原型状态，文案和样式都可以随时调整。项目数据集中在{' '}
              <code>src/data/</code> 目录，改起来很方便。
            </p>
          </div>

          <div className="about-skills">
            <h3 className="subsection-title">技能标签</h3>
            <ul className="chip-list">
              {profile.skills.map((skill) => (
                <li key={skill} className="chip">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
