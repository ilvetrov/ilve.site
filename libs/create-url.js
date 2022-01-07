const inArraySerarator = '--'

export function createUrl(path, params = {}, nestingParam = true) {
  const domain = getCurrentDomain()
  const queryParams = nestingParam ? paramsToNestingUrl(params) : paramsToGetUrl(params)
  const url = domain + '/api' + path + queryParams

  return url
}

export function getCurrentDomain() {
  return `http://localhost:${process.env.SERVER_PORT}`
}

export function paramsToNestingUrl(params) {
  return paramDataToUrl(params)
}

export function paramsToGetUrl(params = {}) {
  let queryParams = ''
  let index = 0
  for (const key in params) {
    if (!Object.hasOwnProperty.call(params, key)) continue
    
    const paramData = params[key]
    if (index === 0) {
      queryParams += `?`
    } else {
      queryParams += `&`
    }
    queryParams += key
    queryParams += '='
    queryParams += paramDataToUrl(paramData)

    index++
  }

  return queryParams
}

export function urlToObject(url) {
  let object = {}
  const paramsRaw = url.split('?')[1].split('&')
  paramsRaw.forEach(paramRaw => {
    const key = paramRaw.split('=')[0]
    const data = paramRaw.split('=')[1]

    object[key] = getCookedParamData(data)
  });

  return object
}

export function getCookedParamData(paramData) {
  if (paramData.indexOf(inArraySerarator) === -1) return decodeURIComponent(paramData)
  return decodeURIComponent(paramData).split(inArraySerarator)
}

export function paramDataToUrl(paramData) {
  return encodeURIComponent(
    typeof paramData !== 'object'
      ? paramData
      : paramData.join(inArraySerarator)
  )
}

export function cookParamsInObject(params) {
  const newParams = {}
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      const data = params[key]
      newParams[key] = getCookedParamData(data)
    }
  }
  return newParams
}