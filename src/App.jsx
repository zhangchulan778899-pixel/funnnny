import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, MapPin, MoveRight, ChevronLeft, ChevronRight, X } from 'lucide-react'

const projects = [
  {
    index: '01',
    title: '画院庭生·隆回滩头传统民居改造',
    subtitle: '第七届全国绿建一等奖',
    year: '2025',
    image: '/project-01.png',
    logo: '/project-logo-01.png',
    gallery: [
      { src: '/project-01-gallery/aerial.jpg', caption: '整体鸟瞰 · OVERALL AERIAL VIEW' },
      { src: '/project-01-gallery/winter-aerial.jpg', caption: '冬季鸟瞰 · WINTER AERIAL VIEW' },
      { src: '/project-01-gallery/entrance-bridge.jpg', caption: '入户桥 · ENTRANCE BRIDGE' },
      { src: '/project-01-gallery/waterside.jpg', caption: '水系界面 · WATERSIDE INTERFACE' },
      { src: '/project-01-gallery/roof-corridor.jpg', caption: '屋顶连廊 · ROOFTOP CORRIDOR' },
      { src: '/project-01-gallery/papermaking-workshop.jpg', caption: '抄纸作坊 · PAPERMAKING WORKSHOP' },
    ],
  },
  {
    index: '02',
    title: '第二地面上·挂咀州老船厂改造',
    subtitle: '湖南省可持续一等奖',
    year: '2025',
    image: '/project-02.png',
    logo: '/project-logo-02.png',
    gallery: [
      { src: '/project-02-gallery/autumn-aerial.jpg', caption: '秋季鸟瞰 · AUTUMN AERIAL VIEW' },
      { src: '/project-02-gallery/farmland-water-tower.jpg', caption: '农田水塔 · FARMLAND WATER TOWER' },
      { src: '/project-02-gallery/night-view-01.jpg', caption: '夜景一 · NIGHT VIEW 01' },
      { src: '/project-02-gallery/night-view-02.jpg', caption: '夜景二 · NIGHT VIEW 02' },
      { src: '/project-02-gallery/night-view-03.jpg', caption: '夜景三 · NIGHT VIEW 03' },
      { src: '/project-02-gallery/waterside-reflection.jpg', caption: '湖畔倒影 · WATERSIDE REFLECTION' },
    ],
  },
  {
    index: '03',
    title: '延景·融生—青少年活动中心设计',
    subtitle: '城市设计 / 青少年公共活动空间',
    year: '2024',
    image: '/project-03.png',
    logo: '/project-logo-03.png',
    gallery: [
      { src: '/project-03-gallery/autumn-aerial.jpg', caption: '秋季鸟瞰 · AUTUMN AERIAL VIEW' },
      { src: '/project-03-gallery/autumn-view.jpg', caption: '秋季全景 · AUTUMN PANORAMA' },
      { src: '/project-03-gallery/wave-polycarbonate.jpg', caption: '波浪阳光板 · WAVE POLYCARBONATE FACADE' },
      { src: '/project-03-gallery/vertical-circulation.jpg', caption: '垂直交通 · VERTICAL CIRCULATION' },
      { src: '/project-03-gallery/platform.jpg', caption: '共享平台 · SHARED PLATFORM' },
      { src: '/project-03-gallery/studio-hall.jpg', caption: '演播厅 · STUDIO HALL' },
    ],
  },
  {
    index: '04',
    title: '旧构新生·鹤岭镇火车维修站更新',
    subtitle: '毕业设计 / 工业遗产保护 / 适应性改造',
    year: '2026',
    image: '/project-04.jpg',
    logo: '/project-logo-04.png',
    gallery: [
      { src: '/project-04-gallery/autumn-aerial.jpg', caption: '秋季鸟瞰 · AUTUMN AERIAL VIEW' },
      { src: '/project-04-gallery/aerial.jpg', caption: '整体鸟瞰 · OVERALL AERIAL VIEW' },
      { src: '/project-04-gallery/spring-equinox.jpg', caption: '春分时景 · SPRING EQUINOX' },
      { src: '/project-04-gallery/grassland.jpg', caption: '草地界面 · GRASSLAND FRONTAGE' },
      { src: '/project-04-gallery/vertical-circulation.jpg', caption: '垂直交通 · VERTICAL CIRCULATION' },
      { src: '/project-04-gallery/office-area.jpg', caption: '办公区 · OFFICE AREA' },
      { src: '/project-04-gallery/overall-space.jpg', caption: '整体空间 · OVERALL SPACE' },
      { src: '/project-04-gallery/courtyard.jpg', caption: '庭院 · COURTYARD' },
      { src: '/project-04-gallery/lounge-area.jpg', caption: '休闲区 · LOUNGE AREA' },
      { src: '/project-04-gallery/night-view.jpg', caption: '夜景 · NIGHT VIEW' },
    ],
  },
  {
    index: '05',
    title: '重启·邻脉—基于张谷英村村落研究设计',
    subtitle: '湖南省可持续二等奖 / 概念设计 / 村落研究',
    year: '2023',
    image: '/project-05.jpg',
    logo: '/project-logo-05.png',
    gallery: [
      { src: '/project-05-gallery/aerial.jpg', caption: '整体鸟瞰 · OVERALL AERIAL VIEW' },
      { src: '/project-05-gallery/entrance.jpg', caption: '入口界面 · ENTRANCE FRONTAGE' },
      { src: '/project-05-gallery/courtyard.jpg', caption: '庭院 · COURTYARD' },
      { src: '/project-05-gallery/tea-room.jpg', caption: '茶室 · TEA ROOM' },
      { src: '/project-05-gallery/guest-room.jpg', caption: '客房 · GUEST ROOM' },
    ],
  },
]

const collaborations = [
  ['01', '建筑设计', 'ARCHITECTURAL DESIGN', '面向住宅、公共建筑与更新项目，提供概念构思、空间推演、方案深化及建筑表现等完整设计服务。'],
  ['02', '小设计', 'SMALL-SCALE DESIGN', '承接空间装置、展陈节点、景观小品与局部改造，以轻量尺度回应具体场景与真实使用需求。'],
  ['03', '快题设计', 'RAPID DESIGN', '针对升学、竞赛与方案汇报需求，提供限时构思、图面组织、表达优化及针对性设计辅导。'],
  ['04', '作品分享', 'PORTFOLIO SHARING', '持续整理设计过程、图纸表达与作品集经验，也欢迎围绕建筑学习与创作展开内容合作。'],
]

const commercialArchitectureProject = {
  index: 'C01',
  title: '旧址新序——鹤岭镇废弃铁路维修站活化改造设计',
  subtitle: '建筑设计商单 / 工业遗产活化改造 / 完整方案展示',
  year: '2026',
  image: '/commercial-architecture-01/page-02.jpg',
  gallery: [
    { src: '/commercial-architecture-01/page-02.jpg', caption: '整体鸟瞰 · OVERALL AERIAL VIEW' },
    { src: '/commercial-architecture-01/page-05.jpg', caption: '项目背景 · PROJECT BACKGROUND' },
    { src: '/commercial-architecture-01/page-07.jpg', caption: '区位分析 · LOCATION ANALYSIS' },
    { src: '/commercial-architecture-01/page-08.jpg', caption: '场地现状 · SITE CONDITIONS' },
    { src: '/commercial-architecture-01/page-09.jpg', caption: '设计逻辑 · DESIGN LOGIC' },
    { src: '/commercial-architecture-01/page-11.jpg', caption: '现状建筑分析 · EXISTING BUILDING ANALYSIS' },
    { src: '/commercial-architecture-01/page-12.jpg', caption: '设计策略 · DESIGN STRATEGY' },
    { src: '/commercial-architecture-01/page-14.jpg', caption: '总平面图 · SITE PLAN' },
    { src: '/commercial-architecture-01/page-15.jpg', caption: '首层平面图 · FIRST FLOOR PLAN' },
    { src: '/commercial-architecture-01/page-16.jpg', caption: '首层功能分析 · FIRST FLOOR PROGRAM' },
    { src: '/commercial-architecture-01/page-17.jpg', caption: '二层平面图 · SECOND FLOOR PLAN' },
    { src: '/commercial-architecture-01/page-18.jpg', caption: '二层功能分析 · SECOND FLOOR PROGRAM' },
    { src: '/commercial-architecture-01/page-19.jpg', caption: '三层平面图 · THIRD FLOOR PLAN' },
    { src: '/commercial-architecture-01/page-20.jpg', caption: '屋顶平面图 · ROOF PLAN' },
    { src: '/commercial-architecture-01/page-21.jpg', caption: '建筑剖面一 · SECTION 01' },
    { src: '/commercial-architecture-01/page-22.jpg', caption: '建筑剖面二 · SECTION 02' },
    { src: '/commercial-architecture-01/page-23.jpg', caption: '建筑立面一 · ELEVATION 01' },
    { src: '/commercial-architecture-01/page-24.jpg', caption: '建筑立面二 · ELEVATION 02' },
    { src: '/commercial-architecture-01/page-26.jpg', caption: '方案鸟瞰 · PROPOSAL AERIAL VIEW' },
    { src: '/commercial-architecture-01/page-27.jpg', caption: '入口透视 · ENTRANCE PERSPECTIVE' },
    { src: '/commercial-architecture-01/page-28.jpg', caption: '连廊空间 · CORRIDOR SPACE' },
    { src: '/commercial-architecture-01/page-29.jpg', caption: '庭院界面 · COURTYARD FRONTAGE' },
    { src: '/commercial-architecture-01/page-30.jpg', caption: '建筑立面效果 · FACADE VIEW' },
  ],
}

const competitionExperience = [
  { year: '2025', title: '全国第七届高等院校绿色建筑技能大赛', award: '一等奖' },
  { year: '2025', title: '湖南省大学生可持续建筑竞赛', award: '一等奖' },
  { year: '2024', title: '湖南省大学生可持续建筑竞赛', award: '二等奖' },
  { year: '2024', title: '园冶杯大学生国际竞赛', award: '荣誉奖' },
  { year: '2024', title: '首届 D5 杯全国高校设计大赛', award: '优秀奖 · NO.12' },
  { year: '2023', title: '湖南省大学生可持续建筑竞赛', award: '三等奖' },
  { year: '2023', title: '湖南省顶峰设计竞赛', award: '铜奖' },
  { year: '2023', title: '首届湖南省大学生节能减排社会实践与科技竞赛', award: '三等奖' },
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
    await navigator.clipboard.writeText('fqw19330235175@163.com')
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
            <button type="button" className="contact-email" onClick={copyEmail}><span>{copied ? '邮箱已复制' : '联系我：'}<u>fqw19330235175@163.com</u></span><i aria-hidden="true" /></button>
          </div>
        </div>
      </div>
      <div className="contact-bottom shell"><span>范钦威 · 建筑设计作品集</span><span>横向移动鼠标，探索画面</span><a href="#home">BACK TO TOP ↑</a></div>
    </footer>
  )
}

function ProjectViewer({ project, onClose }) {
  const viewportRef = useRef(null)
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const gallery = project.gallery || [{ src: project.image, caption: '项目主效果图 · PROJECT VIEW' }]

  const goTo = (nextIndex) => {
    const boundedIndex = Math.max(0, Math.min(gallery.length - 1, nextIndex))
    const viewport = viewportRef.current
    if (viewport) viewport.scrollTo({ left: viewport.clientWidth * boundedIndex, behavior: 'smooth' })
    setCurrentIndex(boundedIndex)
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goTo(currentIndex - 1)
      if (event.key === 'ArrowRight') goTo(currentIndex + 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, onClose])

  const handleScroll = (event) => {
    const viewport = event.currentTarget
    setCurrentIndex(Math.round(viewport.scrollLeft / viewport.clientWidth))
  }

  const startDrag = (event) => {
    const viewport = event.currentTarget
    dragRef.current = { active: true, startX: event.clientX, scrollLeft: viewport.scrollLeft }
    viewport.setPointerCapture(event.pointerId)
    viewport.classList.add('is-dragging')
  }

  const moveDrag = (event) => {
    if (!dragRef.current.active) return
    event.currentTarget.scrollLeft = dragRef.current.scrollLeft - (event.clientX - dragRef.current.startX)
  }

  const endDrag = (event) => {
    if (!dragRef.current.active) return
    dragRef.current.active = false
    event.currentTarget.classList.remove('is-dragging')
    goTo(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))
  }

  return (
    <section className="project-viewer" role="dialog" aria-modal="true" aria-label={`${project.title}项目详情`}>
      <header className="project-viewer-header">
        <button type="button" className="project-viewer-close" onClick={onClose} aria-label="关闭项目详情"><X size={19} /><span>返回项目</span></button>
        <div className="project-viewer-title"><span>{project.index} / {project.year}</span><strong>{project.title}</strong><small>{project.subtitle}</small></div>
        <div className="project-viewer-controls">
          <span>{String(currentIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0} aria-label="上一张效果图"><ChevronLeft size={20} /></button>
          <button type="button" onClick={() => goTo(currentIndex + 1)} disabled={currentIndex === gallery.length - 1} aria-label="下一张效果图"><ChevronRight size={20} /></button>
        </div>
      </header>
      <div className="project-viewer-viewport" ref={viewportRef} onScroll={handleScroll} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag}>
        {gallery.map((item, index) => (
          <figure className="project-viewer-slide" key={item.src}>
            <img src={item.src} alt={`${project.title}—${item.caption}`} loading={index === 0 ? 'eager' : 'lazy'} draggable="false" />
            <figcaption><span>{item.caption}</span><small>拖动或滑动浏览 · DRAG / SWIPE</small></figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function App() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [pricingOpen, setPricingOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    const updateNav = () => setNavScrolled(window.scrollY >= window.innerHeight - 160)
    updateNav()
    window.addEventListener('scroll', updateNav, { passive: true })
    window.addEventListener('resize', updateNav)
    return () => {
      window.removeEventListener('scroll', updateNav)
      window.removeEventListener('resize', updateNav)
    }
  }, [])

  useEffect(() => {
    if (!profileOpen && !pricingOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setProfileOpen(false)
        setPricingOpen(false)
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [profileOpen, pricingOpen])

  return (
    <main>
      <section className="hero" id="home">
        <img className="hero-video" src="/hero-v2.png" alt="黑白建筑柱廊与光影构成" />
        <div className="hero-shade" />
        <header className={`nav shell ${navScrolled ? 'is-scrolled' : ''}`}>
          <a className="brand" href="#home" aria-label="FUNNNNNY STUDIO 返回首页">
            <img className="brand-mark" src="/studio-mark.png" alt="" aria-hidden="true" />
            <span className="brand-name">FUNNNNNY <b>STUDIO</b></span>
          </a>
          <nav aria-label="主导航">
            <a href="#works"><strong>作品</strong><small>WORKS</small></a>
            <a href="#collaboration"><strong>合作</strong><small>COLLABORATION</small></a>
            <a href="#contact"><strong>联系</strong><small>CONTACT</small></a>
          </nav>
          <div className="nav-actions">
            <button type="button" className="nav-pricing" onClick={() => { setPricingOpen((open) => !open); setProfileOpen(false) }} aria-expanded={pricingOpen} aria-controls="pricing-panel"><span className="pricing-dot" aria-hidden="true" />明细 <small>PRICING</small></button>
            <button type="button" className="nav-contact" onClick={() => { setProfileOpen((open) => !open); setPricingOpen(false) }} aria-expanded={profileOpen} aria-controls="profile-panel"><span className="person-dot" />个人介绍 <small>ABOUT</small></button>
          </div>
        </header>
        <aside className={`profile-panel ${profileOpen ? 'is-open' : ''}`} id="profile-panel" role="dialog" aria-label="个人介绍" aria-hidden={!profileOpen}>
          <div className="profile-panel-head"><span>PROFILE / 范钦威</span><button type="button" onClick={() => setProfileOpen(false)} aria-label="关闭个人介绍">×</button></div>
          <div className="profile-panel-body">
            <div className="profile-panel-portrait"><img src="/portrait.jpg" alt="范钦威个人肖像" /></div>
            <div className="profile-panel-copy">
              <span>ARCHITECT / QINWEI FAN</span>
              <h2>设计始于观察，<br />成于克制。</h2>
              <p className="profile-lead">我是一名建筑学专业的青年设计师，关注建筑与环境、使用者及城市语境之间真实而持久的关系。</p>
              <p>西安建筑科技大学建筑学研究生。在持续的竞赛与实践中，我不断探索可持续策略如何转化为空间语言，也相信好的建筑应兼具理性秩序与人的温度。</p>
            </div>
          </div>
          <div className="profile-panel-stats">
            <div><strong>10<sup>+</sup></strong><span>设计竞赛奖项</span></div>
            <div><strong>3.51</strong><span>本科 GPA</span></div>
            <div><strong>TOP 10<sup>%</sup></strong><span>专业成绩排名</span></div>
          </div>
          <section className="profile-competitions" aria-labelledby="competition-heading">
            <div className="profile-competitions-head">
              <span id="competition-heading">COMPETITIONS / 竞赛经历</span>
              <small>AWARDS · 2023—2025</small>
            </div>
            <div className="profile-competition-grid">
              {competitionExperience.map((item) => (
                <article key={`${item.year}-${item.title}`}>
                  <time>{item.year}</time>
                  <p>{item.title}</p>
                  <strong>{item.award}</strong>
                </article>
              ))}
            </div>
          </section>
          <div className="profile-panel-contact">
            <a href="tel:19330235175"><Phone size={15} />193 3023 5175</a>
            <a href="mailto:fqw19330235175@163.com"><Mail size={15} />fqw19330235175@163.com</a>
            <span><MapPin size={15} />湖南 · 中国</span>
          </div>
        </aside>
        <aside className={`profile-panel pricing-panel ${pricingOpen ? 'is-open' : ''}`} id="pricing-panel" role="dialog" aria-label="报价明细" aria-hidden={!pricingOpen}>
          <div className="profile-panel-head"><span>PRICING / 报价明细</span><button type="button" onClick={() => setPricingOpen(false)} aria-label="关闭报价明细">×</button></div>
          <div className="pricing-intro">
            <span>STUDIO OF FUNNNNNY</span>
            <h2>图纸报价表<em>及收款说明</em></h2>
            <p>以下为基础参考价格，具体费用将根据项目体量、时间与需求确定。</p>
          </div>
          <div className="pricing-grid">
            <article>
              <h3><span>01</span>效果图 <small>RENDERING</small></h3>
              <div className="pricing-row"><span>鸟瞰单张</span><strong>¥200–300</strong></div>
              <div className="pricing-row"><span>人视单张</span><strong>¥100–180</strong></div>
            </article>
            <article>
              <h3><span>02</span>技术图纸 <small>TECHNICAL DRAWING</small></h3>
              <div className="pricing-row"><span>平、立、剖面图</span><strong>¥100–150</strong></div>
            </article>
            <article>
              <h3><span>03</span>分析图 <small>ANALYSIS CHART</small></h3>
              <div className="pricing-row"><span>分析图</span><strong>¥80–120</strong></div>
            </article>
            <article>
              <h3><span>04</span>整套设计 <small>THE WHOLE DESIGN</small></h3>
              <div className="pricing-row"><span>整套设计文本</span><strong>¥3,500 起</strong></div>
            </article>
            <article className="pricing-feature">
              <h3><span>05</span>作品集辅导 <small>PORTFOLIO GUIDANCE</small></h3>
              <div className="pricing-row"><span>作品集优化辅导</span><strong>¥900</strong></div>
              <div className="pricing-row"><span>单个设计作品购买</span><strong>¥3,500</strong></div>
            </article>
          </div>
          <div className="pricing-terms">
            <span>PAYMENT / 收款说明</span>
            <ol>
              <li>预收 60% 定金，剩余 40% 于最后交图、源文件及图纸打包整理后支付。</li>
              <li>对比其他工作室，可以接受多次修改要求。</li>
              <li>下单数量够多，报价可享受优惠。</li>
              <li>整套建筑设计接单，根据预留时间、需求及内容再确定精确报价。</li>
            </ol>
          </div>
          <a className="pricing-contact" href="mailto:fqw19330235175@163.com">咨询合作 <MoveRight size={16} /></a>
        </aside>
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
        </div>
      </section>

      <section className="works section" id="works">
        <div className="shell section-heading works-heading"><span>01 / ARCHITECTURE PROJECTS</span><h2>建筑项目</h2></div>
        <div className="project-list shell">
          {projects.map((project) => (
            <article className="project" key={project.index}>
              <div className="project-rail"><div className="project-identity"><strong>{project.index}</strong><img className="project-logo" src={project.logo} alt={`${project.title}项目图标`} /><h3>{project.title}</h3></div><time>{project.year}</time></div>
              <div className="project-main">
                <button type="button" className="project-image" onClick={() => setActiveProject(project)} aria-label={`查看${project.title}项目详情`}><img src={project.image} alt={project.title} /><span className="project-open-cue">查看项目 <MoveRight size={17} /></span></button>
                <div className="project-copy"><p>{project.subtitle}</p></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeProject && <ProjectViewer project={activeProject} onClose={() => setActiveProject(null)} />}

      <section className="strengths collaboration section shell" id="collaboration">
        <div className="section-heading collaboration-heading"><span>02 / COLLABORATION</span><div><h2>合作展示</h2><p>从建筑到表达，承接多尺度设计委托。</p></div></div>
        <div className="strength-grid">
          {collaborations.map(([num, title, english, text]) => (
            <article key={num}>
              <span>{num} / {english}</span><h3>{title}</h3><p>{text}</p>
              <button type="button" className="collaboration-project-link" onClick={() => { if (num === '01') setActiveProject(commercialArchitectureProject) }} disabled={num !== '01'} aria-label={num === '01' ? `查看${title}商单项目` : `${title}项目内容待更新`}>查看项目 <MoveRight size={18} /></button>
            </article>
          ))}
        </div>
      </section>

      <ContactSection />
    </main>
  )
}

export default App
