import { ArrowDown, ArrowUpRight, Mail, Phone, MapPin, MoveRight } from 'lucide-react'

const projects = [
  {
    index: '01',
    title: '山水之间 · 绿色公共建筑',
    subtitle: '全国高等院校绿色建筑技能大赛 · 一等奖',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=88',
  },
  {
    index: '02',
    title: '共生院落 · 可持续社区',
    subtitle: '湖南省大学生可持续建筑竞赛 · 一等奖',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=88',
  },
  {
    index: '03',
    title: '校园更新 · 南校区改造',
    subtitle: '概念方案设计 / 公共空间更新',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=88',
  },
]

const strengths = [
  ['01', '建筑设计', '从场地解读、概念生成到空间落地，构建清晰且富有张力的设计叙事。'],
  ['02', '可持续策略', '以气候、材料与能耗为线索，将绿色策略融入建筑形式与日常体验。'],
  ['03', '数字化表达', '熟练运用 Rhino、D5、AutoCAD、SketchUp 与 Photoshop 完成设计表达。'],
  ['04', '调研与协作', '具备古建筑测绘、艺术写生与团队竞赛经验，快速适应复杂项目语境。'],
]

function App() {
  return (
    <main>
      <section className="hero" id="home">
        <video className="hero-video" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2000&q=88">
          <source src="https://videos.pexels.com/video-files/3764259/3764259-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <header className="nav shell">
          <a className="brand" href="#home" aria-label="FUNNNNNY STUDIO 返回首页">
            <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
            <span className="brand-name">FUNNNNNY <b>STUDIO</b></span>
          </a>
          <nav aria-label="主导航">
            <a href="#works"><strong>作品</strong><small>WORKS</small></a>
            <a href="#about"><strong>经历</strong><small>PROFILE</small></a>
            <a href="#strengths"><strong>能力</strong><small>EXPERTISE</small></a>
            <a href="#contact"><strong>联系</strong><small>CONTACT</small></a>
          </nav>
          <a className="nav-contact" href="#about"><span className="person-dot" />个人介绍 <small>ABOUT</small></a>
        </header>
        <div className="hero-content shell">
          <div className="hero-center">
            <p className="eyebrow">FUNNNNNY STUDIO · ARCHITECTURE</p>
            <h1>以空间回应</h1>
            <p className="hero-slogan">场地与时间</p>
            <p className="hero-slogan-en">SPACE · SITE · TIME</p>
            <div className="hero-identity">
              <strong>建筑设计师 · 范钦威</strong>
              <span>ARCHITECT / QINWEI FAN</span>
              <small>湖南工程学院 · 建筑学</small>
            </div>
          </div>
          <a href="#about" className="scroll-down" aria-label="向下了解更多">
            <span>向下滚动<small>SCROLL DOWN</small></span>
            <ArrowDown size={18} />
          </a>
        </div>
      </section>

      <section className="about section shell" id="about">
        <div className="section-heading"><span>01 / PROFILE</span><h2>设计始于观察，<br />成于克制。</h2></div>
        <div className="about-grid">
          <div className="portrait-wrap"><div className="portrait-frame"><img src="/portrait.jpg" alt="范钦威个人肖像" /></div><span className="image-note">PORTRAIT / 2025</span></div>
          <div className="bio">
            <p className="lead">我是一名建筑学专业的青年设计师，关注建筑与环境、使用者及城市语境之间真实而持久的关系。</p>
            <p>本科就读于湖南工程学院建筑学专业，GPA 3.51，专业排名前 10%。在持续的竞赛与实践中，我不断探索可持续策略如何转化为空间语言，也相信好的建筑应兼具理性秩序与人的温度。</p>
            <div className="contact-lines">
              <a href="tel:19330235175"><Phone size={17} />193 3023 5175</a>
              <a href="mailto:2093507279@qq.com"><Mail size={17} />2093507279@qq.com</a>
              <span><MapPin size={17} />湖南 · 中国</span>
            </div>
          </div>
          <div className="stats">
            <div><strong>10<sup>+</sup></strong><span>设计竞赛奖项</span></div>
            <div><strong>3.51</strong><span>本科 GPA</span></div>
            <div><strong>TOP 10<sup>%</sup></strong><span>专业成绩排名</span></div>
          </div>
        </div>
      </section>

      <section className="works section" id="works">
        <div className="shell section-heading works-heading"><span>02 / SELECTED WORKS</span><h2>精选项目</h2><p>对气候、场地与公共生活的阶段性回应</p></div>
        <div className="project-list shell">
          {projects.map((project) => (
            <article className="project" key={project.index}>
              <div className="project-image"><img src={project.image} alt={project.title} /><span className="project-arrow"><ArrowUpRight size={28} /></span></div>
              <div className="project-meta"><span>{project.index}</span><div><h3>{project.title}</h3><p>{project.subtitle}</p></div><time>{project.year}</time></div>
            </article>
          ))}
        </div>
      </section>

      <section className="strengths section shell" id="strengths">
        <div className="section-heading"><span>03 / CAPABILITIES</span><h2>以复合能力，<br />推动设计落地。</h2></div>
        <div className="strength-grid">
          {strengths.map(([num, title, text]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p><MoveRight size={22} /></article>)}
        </div>
      </section>

      <footer className="contact" id="contact">
        <div className="shell contact-inner">
          <p className="eyebrow">OPEN FOR COLLABORATION · 2026</p>
          <h2>让我们一起，<br /><em>构想下一处空间。</em></h2>
          <a className="mail-link" href="mailto:2093507279@qq.com">写封邮件给我 <ArrowUpRight size={26} /></a>
          <div className="footer-line"><span>范钦威 · 建筑设计作品集</span><span>© 2026 ALL RIGHTS RESERVED</span><a href="#home">BACK TO TOP ↑</a></div>
        </div>
      </footer>
    </main>
  )
}

export default App
