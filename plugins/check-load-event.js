export function checkLoadEvent() {
  const navData = window.performance.getEntriesByType("navigation")
  return navData.length > 0 && navData[0].loadEventEnd > 0
}