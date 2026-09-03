import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import './PortfolioDialog.css'

export default function PortfolioDialog({ onClose }) {
  const dialogRef = useRef(null)
  const frameRef = useRef(null)
  const [frameStatus, setFrameStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
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

  useEffect(() => {
    let settled = false
    const timeout = window.setTimeout(() => {
      if (!settled) setFrameStatus('error')
    }, 15000)
    const receiveBookMessage = (event) => {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return
      if (event.data?.channel !== 'portfolio-book') return
      if (event.data.type === 'ready' || event.data.type === 'error') {
        settled = true
        window.clearTimeout(timeout)
        setFrameStatus(event.data.type)
      } else if (event.data.type === 'close') onClose()
    }
    window.addEventListener('message', receiveBookMessage)
    return () => {
      window.clearTimeout(timeout)
      window.removeEventListener('message', receiveBookMessage)
    }
  }, [attempt, onClose])

  const connectFrame = () => {
    // postMessage is safe even if a failed navigation leaves an opaque error document.
    frameRef.current?.contentWindow?.postMessage({ channel: 'portfolio-book', type: 'probe' }, window.location.origin)
  }
  const retryBook = () => {
    setFrameStatus('loading')
    setAttempt((value) => value + 1)
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
        <iframe ref={frameRef} key={attempt} className="portfolio-book-frame" data-ready={frameStatus === 'ready'} src={`/portfolio-book/index.html?embed=1&attempt=${attempt}`} title="范钦威建筑作品集翻页画册" onLoad={connectFrame} onError={() => setFrameStatus('error')} />
        {frameStatus !== 'ready' && <div className="portfolio-book-status" role="status" aria-live="polite">
          <p>{frameStatus === 'error' ? '作品集暂时未能加载，请确认网站连接后重试。' : '正在打开作品集…'}</p>
          {frameStatus === 'error' && <button type="button" onClick={retryBook}>重新加载作品集</button>}
        </div>}
      </div>
    </dialog>
  )
}
