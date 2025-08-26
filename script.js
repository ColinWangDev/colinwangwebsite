// 主题切换：优先使用用户显式设置，否则跟随系统
(function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  } else {
    root.setAttribute('data-theme', 'auto');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  // 年份
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 移动端菜单
  const toggleBtn = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if (toggleBtn && navList) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // 返回顶部
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 主题切换
  const themeButton = document.getElementById('theme-toggle');
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const root = document.documentElement;
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // 示例项目数据
  const projects = [
    {
      id: 'p1',
      title: '个人博客平台',
      desc: '基于静态生成与评论系统的个人博客模版。',
      tags: ['web'],
      links: { demo: '#', repo: '#' }
    },
    {
      id: 'p2',
      title: '命令行效率工具',
      desc: '改善日常开发流的 CLI 工具集。',
      tags: ['tool'],
      links: { repo: '#' }
    },
    {
      id: 'p3',
      title: '数据可视化实验',
      desc: '用 Canvas/SVG 实现交互式图表与动画。',
      tags: ['web', 'other'],
      links: { demo: '#', repo: '#' }
    }
  ];

  // 渲染项目卡片
  const grid = document.getElementById('project-grid');
  function render(filter) {
    if (!grid) return;
    const list = filter && filter !== 'all' ? projects.filter(p => p.tags.includes(filter)) : projects;
    grid.innerHTML = list.map(p => `
      <article class="card project-card" tabindex="0">
        <div class="thumb" aria-hidden="true" style="height:140px;border-radius:8px;background:linear-gradient(135deg,var(--chip),var(--card));"></div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="project-links">
          ${p.links.demo ? `<a href="${p.links.demo}" target="_blank" rel="noreferrer noopener">预览</a>` : ''}
          ${p.links.repo ? `<a href="${p.links.repo}" target="_blank" rel="noreferrer noopener">代码</a>` : ''}
        </div>
      </article>
    `).join('');
  }
  render('all');

  // 筛选交互
  const filterButtons = document.querySelectorAll('.filters .chip');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.getAttribute('data-filter');
      render(filter);
    });
  });

  // 简易表单校验与伪提交
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  function setHint(id, message) {
    const hint = document.querySelector(`.field-hint[data-for="${id}"]`);
    if (hint) hint.textContent = message || '';
  }
  function validate() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let ok = true;
    if (!name.value.trim()) { setHint('name', '请填写姓名'); ok = false; } else setHint('name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { setHint('email', '邮箱格式不正确'); ok = false; } else setHint('email');
    if (!message.value.trim()) { setHint('message', '请填写留言'); ok = false; } else setHint('message');
    return ok;
  }
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validate()) return;
      statusEl.textContent = '发送中…';
      // 这里可以替换为实际的表单后端（如 Formspree、Vercel Serverless 等）
      await new Promise(r => setTimeout(r, 600));
      statusEl.textContent = '已发送！我会尽快回复你。';
      form.reset();
    });
  }
});


