import { useEffect, useRef, useState } from 'react'
import { X, MoveRight, BookOpen } from 'lucide-react'
import './PortfolioDialog.css'

const sections = ['封面', '目录', '项目内容']

export default function PortfolioDialog({ onClose }) {
  const dialogRef = useRef(null)
  const [section, setSection] = useState(0)

  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true })
    }
  }, [])

  const closeFromBackdrop = (event) => {
    if (event.target !== event.currentTarget) return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
  }

  return (
    <dialog ref={dialogRef} className="portfolio-dialog" id="portfolio-dialog" aria-labelledby="portfolio-title" aria-describedby="portfolio-status" onCancel={(event) => { event.preventDefault(); onClose() }} onClick={closeFromBackdrop}>
      <header className="portfolio-dialog-header">
        <div><span>FUNNNNNY STUDIO</span><h2 id="portfolio-title">作品集 <small>PORTFOLIO</small></h2></div>
        <button type="button" className="portfolio-close" onClick={onClose} aria-label="关闭作品集" autoFocus><X size={20} /></button>
      </header>
      <div className="portfolio-dialog-body">
        <nav className="portfolio-directory" aria-label="作品集目录">
          <span className="portfolio-eyebrow">CONTENTS / 目录</span>
          {sections.map((label, index) => <button type="button" key={label} aria-pressed={section === index} onClick={() => setSection(index)}><small>{String(index + 1).padStart(2, '0')}</small><span>{label}</span><MoveRight size={16} /></button>)}
          <p id="portfolio-status">展示框架已就绪<br />作品集内容待补充</p>
        </nav>
        <section className="portfolio-page" aria-label={sections[section]} aria-live="polite">
          {section === 0 ? <div className="portfolio-cover">
            <span className="portfolio-eyebrow">ARCHITECTURE / QINWEI FAN</span>
            <div><BookOpen size={32} strokeWidth={1} /><h3>空间的记录</h3><p className="portfolio-cover-en">SELECTED WORKS</p><p>范钦威 · 建筑设计作品集</p></div>
            <div className="portfolio-cover-bottom"><span>封面与作品内容待补充</span><button type="button" onClick={() => setSection(1)}>浏览目录 <MoveRight size={16} /></button></div>
          </div> : section === 1 ? <div className="portfolio-index">
            <span className="portfolio-eyebrow">PORTFOLIO INDEX</span><h3>作品目录</h3><p>后续将在这里整理项目顺序与章节。</p>
            {['项目 01', '项目 02', '项目 03'].map((label) => <div className="portfolio-index-row" key={label}><span>{label}</span><small>标题 / 页码待补充</small></div>)}
            <button type="button" className="portfolio-text-button" onClick={() => setSection(2)}>查看内容框架 <MoveRight size={16} /></button>
          </div> : <div className="portfolio-placeholder">
            <span className="portfolio-eyebrow">PROJECT CONTENT</span><h3>为作品留白</h3>
            <div className="portfolio-empty-sheet"><BookOpen size={32} strokeWidth={1} /><strong>作品集展示区</strong><span>项目图纸、效果图与设计文字将在这里呈现。</span></div>
            <p>目前仅展示框架，尚未添加作品集文件。</p>
          </div>}
        </section>
      </div>
      <footer className="portfolio-dialog-footer"><span>作品集预览 · 内容待补充</span><span>{String(section + 1).padStart(2, '0')} / 03</span></footer>
    </dialog>
  )
}
