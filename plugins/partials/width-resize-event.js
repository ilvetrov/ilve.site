const resizeWidthEventName = 'resize-width';
const widthResizeEvent = process.browser && new CustomEvent(resizeWidthEventName);

let windowWidth = process.browser && window.innerWidth;

export function getWindowWidth() {
  return windowWidth;
}

if (process.browser) {
  window.addEventListener('resize', function() {
    if (window.innerWidth !== windowWidth) {
      windowWidth = window.innerWidth;
      
      window.dispatchEvent(widthResizeEvent);
    }
  });
}

export default resizeWidthEventName