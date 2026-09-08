import bookHtml from '../../public/portfolio-book/index.html?raw'
import bookCss from '../../public/portfolio-book/styles.css?raw'
import bookRuntime from '../../public/portfolio-book/flipbook.js?raw'
import pageFlipLibrary from '../../public/portfolio-book/vendor/page-flip.browser.js?raw'

const inlineScript = (code) => `<script>${code.replace(/<\/script/gi, '<\\/script')}</script>`

// Bundle the complete book document with the app so opening the modal never
// navigates a child frame to a separate HTML endpoint or authentication page.
export function portfolioDocument(origin) {
  const base = new URL('/portfolio-book/', origin).href
  return bookHtml
    .replace('<head>', `<head><base href="${base}">`)
    .replace('<link rel="stylesheet" href="styles.css">', () => `<style>${bookCss}</style>`)
    .replace('<script src="vendor/page-flip.browser.js"></script>', () => inlineScript(pageFlipLibrary))
    .replace('<script src="flipbook.js"></script>', () => inlineScript(bookRuntime))
    .replaceAll('window.location.origin', 'new URL(document.baseURI).origin')
}
