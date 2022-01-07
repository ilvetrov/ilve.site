import { createUrl } from "./create-url"

export async function get(path, params = {}, nestingParam = true) {
  const url = createUrl(path, params, nestingParam)
  return fetch(url).then(res => res.json())
}

const siteApi = {
  get
}
export default siteApi