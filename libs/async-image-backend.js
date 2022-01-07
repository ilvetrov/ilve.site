const minSizeToHighLoad = 409600

/**
 * @param {object} params
 * @param {string} params.src
 * @param {boolean} [params.scroll=true]
 * @param {boolean} [params.isBackground=false]
 * @param {boolean} [params.fullPath=false]
 * @param {boolean} [params.manual=false]
 */
export function async_image(params) {
  params = {...{
    scroll: true,
    isBackground: false,
    fullPath: false,
    manual: false,
  }, ...params}

  params.outputSrc = getOutputSrc(params)

  const asyncData = getLinkProperties(params)
  const htmlOfAsyncAttribute = escapeHtml(JSON.stringify(asyncData))
  
  return (htmlOfAsyncAttribute).trim()
}

function getOutputSrc(params) {
  return params.fullPath ? params.src : ('/img/' + params.src)
}

function getLinkProperties(params) {
  return {
    scroll: params.scroll,
    isBackground: params.isBackground,
    manual: params.manual,
    src: params.outputSrc,
  }
}