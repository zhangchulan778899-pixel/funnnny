import { ArrowDown, ArrowUpRight, Mail, Phone, MapPin, MoveRight } from 'lucide-react'

const projects = [
  {
    index: '01',
    title: '画院庭生·隆回滩头传统民居改造',
    subtitle: '第七届全国绿建一等奖',
    year: '2025',
    image: '/project-01.png',
  },
  {
    index: '02',
    title: '第二地面上·挂咀州老船厂改造',
    subtitle: '湖南省可持续一等奖',
    year: '2025',
    image: '/project-02.png',
  },
  {
    index: '03',
    title: '延景·融生—青少年活动中心设计',
    subtitle: '城市设计 / 青少年公共活动空间',
    year: '2024',
    image: '/project-03.png',
  },
  {
    index: '04',
    title: '旧构新生·鹤岭镇火车维修站更新',
    subtitle: '毕业设计 / 工业遗产保护 / 适应性改造',
    year: '2026',
    image: '/project-04.jpg',
  },
  {
    index: '05',
    title: '重启·邻脉—基于张谷英村村落研究设计',
    subtitle: '湖南省可持续二等奖 / 概念设计 / 村落研究',
    year: '2023',
    image: '/project-05.jpg',
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
        <img className="hero-video" src="/hero-v2.png" alt="黑白建筑柱廊与光影构成" />
        <div className="hero-shade" />
        <header className="nav shell">
          <a className="brand" href="#home" aria-label="FUNNNNNY STUDIO 返回首页">
            <img className="brand-mark" src="/studio-mark.png" alt="" aria-hidden="true" />
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
              <small>西安建筑科技大学 · 建筑学</small>
            </div>
          </div>
          <a href="#about" className="scroll-down" aria-label="向下了解更多">
            <span>向下滚动<small>SCROLL DOWN</small></span>
            <ArrowDown size={18} />
          </a>
        </div>
      </section>

      <section className="about section shell" id="about">
        <div className="section-heading about-heading"><span>01 / PROFILE</span><div><h2>设计始于观察，成于克制。</h2><p>DESIGN BEGINS WITH OBSERVATION, TAKES FORM THROUGH RESTRAINT.</p></div></div>
        <div className="about-grid">
          <div className="portrait-wrap"><div className="portrait-frame"><img src="/portrait.jpg" alt="范钦威个人肖像" /></div><span className="image-note">PORTRAIT / 2025</span></div>
          <div className="bio">
            <p className="lead">我是一名建筑学专业的青年设计师，关注建筑与环境、使用者及城市语境之间真实而持久的关系。</p>
            <p>西安建筑科技大学建筑学研究生。在持续的竞赛与实践中，我不断探索可持续策略如何转化为空间语言，也相信好的建筑应兼具理性秩序与人的温度。</p>
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
              <div className="project-rail"><span>{project.index}</span><time>{project.year}</time></div>
              <div className="project-main">
                <div className="project-image"><img src={project.image} alt={project.title} /></div>
                <div className="project-copy"><h3>{project.title}</h3><p>{project.subtitle}</p></div>
              </div>
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
