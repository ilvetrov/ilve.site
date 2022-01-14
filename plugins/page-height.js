let pageHeight = process.browser ? getPageHeight() : 0
function getPageHeight() {
  return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
}
if (process.browser) {
  window.addEventListener('resize', function() {
    pageHeight = getPageHeight()
  })
}
export default pageHeight