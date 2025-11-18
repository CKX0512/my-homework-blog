import './About.css'

function About() {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-header">
          <div className="about-avatar">👤</div>
          <h1>关于我</h1>
          <p className="about-subtitle">欢迎来到我的个人博客</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>📚 关于这个博客</h2>
            <p>
              这是一个基于现代Web技术构建的个人博客系统，使用React和Supabase开发。
              在这里，我会分享我的学习心得、技术思考和生活感悟。
            </p>
          </section>

          <section className="about-section">
            <h2>🛠️ 技术栈</h2>
            <ul className="tech-list">
              <li><strong>前端:</strong> React + Vite</li>
              <li><strong>后端:</strong> Supabase (PostgreSQL)</li>
              <li><strong>部署:</strong> Netlify</li>
              <li><strong>样式:</strong> 原生CSS (现代设计)</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>✨ 功能特性</h2>
            <ul className="feature-list">
              <li>📝 文章发布与管理</li>
              <li>💬 评论系统</li>
              <li>📱 响应式设计</li>
              <li>🎨 现代化UI界面</li>
              <li>⚡ 快速加载</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>📧 联系方式</h2>
            <p>
              如果你有任何问题或建议，欢迎通过以下方式联系我：
            </p>
            <div className="contact-info">
              <p>📮 Email: your-email@example.com</p>
              <p>🌐 Website: <a href="/">我的博客</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About

