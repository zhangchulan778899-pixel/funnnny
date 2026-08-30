import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Mail, Phone, MapPin, MoveRight } from 'lucide-react'

const projects = [
  {
    index: '01',
    title: '画院庭生·隆回滩头传统民居改造',
    subtitle: '第七届全国绿建一等奖',
    year: '2025',
    image: '/project-01.png',
    logo: '/project-logo-01.png',
  },
  {
    index: '02',
    title: '第二地面上·挂咀州老船厂改造',
    subtitle: '湖南省可持续一等奖',
    year: '2025',
    image: '/project-02.png',
    logo: '/project-logo-02.png',
  },
  {
    index: '03',
    title: '延景·融生—青少年活动中心设计',
    subtitle: '城市设计 / 青少年公共活动空间',
    year: '2024',
    image: '/project-03.png',
    logo: '/project-logo-03.png',
  },
  {
    index: '04',
    title: '旧构新生·鹤岭镇火车维修站更新',
    subtitle: '毕业设计 / 工业遗产保护 / 适应性改造',
    year: '2026',
    image: '/project-04.jpg',
    logo: '/project-logo-04.png',
  },
  {
    index: '05',
    title: '重启·邻脉—基于张谷英村村落研究设计',
    subtitle: '湖南省可持续二等奖 / 概念设计 / 村落研究',
    year: '2023',
    image: '/project-05.jpg',
    logo: '/project-logo-05.png',
  },
]

const collaborations = [
  ['01', '建筑设计', 'ARCHITECTURAL DESIGN', '面向住宅、公共建筑与更新项目，提供概念构思、空间推演、方案深化及建筑表现等完整设计服务。'],
  ['02', '小设计', 'SMALL-SCALE DESIGN', '承接空间装置、展陈节点、景观小品与局部改造，以轻量尺度回应具体场景与真实使用需求。'],
  ['03', '快题设计', 'RAPID DESIGN', '针对升学、竞赛与方案汇报需求，提供限时构思、图面组织、表达优化及针对性设计辅导。'],
  ['04', '作品分享', 'PORTFOLIO SHARING', '持续整理设计过程、图纸表达与作品集经验，也欢迎围绕建筑学习与创作展开内容合作。'],
]

const contactMessage = '很高兴你来到这里。告诉我你的场地、想法与时间，我们从一封邮件开始。'

function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let index = 0
    let interval
    const delay = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) window.clearInterval(interval)
      }, speed)
    }, startDelay)
    return () => {
      window.clearTimeout(delay)
      window.clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayed, done: displayed.length >= text.length }
}

function ContactSection() {
  const videoRef = useRef(null)
  const prevXRef = useRef(null)
  const targetTimeRef = useRef(0)
  const seekingRef = useRef(false)
  const [actionsVisible, setActionsVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const { displayed, done } = useTypewriter(contactMessage)

  useEffect(() => {
    const timer = window.setTimeout(() => setActionsVisible(true), 400)
    return () => window.clearTimeout(timer)
  }, [])

  const seekToTarget = () => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration) || seekingRef.current) return
    if (Math.abs(video.currentTime - targetTimeRef.current) < 0.01) return
    seekingRef.current = true
    video.currentTime = targetTimeRef.current
  }

  const handleMouseMove = (event) => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration)) return
    if (prevXRef.current === null) {
      prevXRef.current = event.clientX
      return
    }
    const delta = event.clientX - prevXRef.current
    prevXRef.current = event.clientX
    const nextTime = targetTimeRef.current + (delta / window.innerWidth) * 0.8 * video.duration
    targetTimeRef.current = Math.min(video.duration, Math.max(0, nextTime))
    seekToTarget()
  }

  const handleSeeked = () => {
    seekingRef.current = false
    seekToTarget()
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText('2093507279@qq.com')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <footer className="contact" id="contact" onMouseMove={handleMouseMove} onMouseLeave={() => { prevXRef.current = null }}>
      <video ref={videoRef} className="contact-video" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4" muted playsInline preload="auto" onLoadedMetadata={() => { targetTimeRef.current = 0 }} onSeeked={handleSeeked} />
      <div className="contact-wash" />
      <div className="contact-top shell"><span>FUNNNNNY STUDIO</span><span>OPEN FOR COLLABORATION · 2026</span></div>
      <div className="contact-stage shell">
        <div className="contact-dialogue">
          <p className="contact-intro">你好，这里是 FUNNNNNY STUDIO<br />建筑与空间设计合作</p>
          <p className="contact-typewriter">{displayed}{!done && <span className="typing-cursor" />}</p>
          <div className={`contact-actions ${actionsVisible ? 'is-visible' : ''}`}>
            {['建筑设计', '小设计', '快题设计', '作品分享'].map((label) => <a key={label} href="#collaboration">{label}</a>)}
            <button type="button" className="contact-email" onClick={copyEmail}><span>{copied ? '邮箱已复制' : '联系我：'}<u>2093507279@qq.com</u></span><i aria-hidden="true" /></button>
          </div>
        </div>
      </div>
      <div className="contact-bottom shell"><span>范钦威 · 建筑设计作品集</span><span>横向移动鼠标，探索画面</span><a href="#home">BACK TO TOP ↑</a></div>
    </footer>
  )
}

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
            <a href="#collaboration"><strong>合作</strong><small>COLLABORATION</small></a>
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
              <div className="project-rail"><img className="project-logo" src={project.logo} alt={`${project.title}项目图标`} /><h3>{project.title}</h3><time>{project.year}</time></div>
              <div className="project-main">
                <div className="project-image"><img src={project.image} alt={project.title} /></div>
                <div className="project-copy"><p>{project.subtitle}</p></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="strengths collaboration section shell" id="collaboration">
        <div className="section-heading collaboration-heading"><span>03 / COLLABORATION</span><div><h2>合作展示</h2><p>从建筑到表达，承接多尺度设计委托。</p></div></div>
        <div className="strength-grid">
          {collaborations.map(([num, title, english, text]) => <article key={num}><span>{num} / {english}</span><h3>{title}</h3><p>{text}</p><a href="mailto:2093507279@qq.com" aria-label={`咨询${title}`}>合作咨询 <MoveRight size={18} /></a></article>)}
        </div>
      </section>

      <ContactSection />
    </main>
  )
}

export default App
