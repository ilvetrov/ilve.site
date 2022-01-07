let windowWidth = process.browser ? window.innerWidth : 0;

export function checkMobile() {
  return checkMobileResolution() || checkMobileAgent();
}

export function checkMobileResolution() {
  return windowWidth < 1024;
}

export function checkMobileAgent() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (process.browser) {
  window.addEventListener('resize-width', function() {
    windowWidth = window.innerWidth;
  });
}