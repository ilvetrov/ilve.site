const cached = require('~/.cache.json') ?? {}

const defaultLifetime = 1 * 1000 * 60 * 60 * 24

export async function cache({name, getter, lifetime = defaultLifetime, update = true}) {
  if (cacheCheck(name)) return cacheGet(name)
  
  if (update) {
    setInterval(() => {
      cacheUpdate(name, getter)
    }, lifetime)
  } else {
    setTimeout(() => {
      cacheDelete(name)
    }, lifetime)
  }

  await cacheSet(name, getter, lifetime, update)

  return cacheGet(name)
}

export function cacheCheck(name) {
  return cached.hasOwnProperty(name)
}

export function cacheGet(name) {
  return cached[name]?.value
}

function cacheDelete(name) {
  delete cached[name]
}

async function cacheSet(name, getter, lifetime, update) {
  cached[name] = {
    value: await getter(),
    lifetime,
    update
  }
}

async function cacheUpdate(name, getter) {
  cached[name].value = await getter()
}