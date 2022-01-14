const preloaded = []

export function preloadImages(images) {
  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    preloadImage(image)
  }
}

function preloadImage(url) {
  if (preloaded.indexOf(url) !== -1) return

  const newImage = new Image()
  newImage.src = url

  newImage.onload = () => preloaded.push(url)
}