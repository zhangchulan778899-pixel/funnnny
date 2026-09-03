import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import './PortfolioDialog.css'

export default function PortfolioDialog({ onClose }) {
  const dialogRef = useRef(null)
  const frameCleanup = useRef(() => {})
  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      frameCleanup.current()
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true })
    }
  }, [])

  const connectFrame = (event) => {
    frameCleanup.current()
    const frameWindow = event.currentTarget.contentWindow
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose() }
    }
    frameWindow.addEventListener('keydown', closeOnEscape)
    frameCleanup.current = () => frameWindow.removeEventListener('keydown', closeOnEscape)
  }
  const closeFromBackdrop = (event) => {
    if (event.target !== event.currentTarget) return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
  }

  return (
    <dialog ref={dialogRef} className="portfolio-dialog" id="portfolio-dialog" aria-labelledby="portfolio-title" onCancel={(event) => { event.preventDefault(); onClose() }} onClick={closeFromBackdrop}>
      <header className="portfolio-dialog-header">
        <div><span>FUNNNNNY STUDIO</span><h2 id="portfolio-title">作品集 <small>PORTFOLIO</small></h2></div>
        <button type="button" className="portfolio-close" onClick={onClose} aria-label="关闭作品集" autoFocus><X size={20} /></button>
      </header>
      <div className="portfolio-dialog-body">
        <iframe className="portfolio-book-frame" src="/portfolio-book/index.html" title="范钦威建筑作品集翻页画册" onLoad={connectFrame} />
      </div>
    </dialog>
  )
}
