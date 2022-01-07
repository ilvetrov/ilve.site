import { existsSync, lstatSync, readdirSync, readFileSync, writeFileSync } from "fs";
import imageSize from "image-size";
import { promisify } from "util";
import { removeFromArray } from "./plugins/partials/remove-from-array.js";

function parsePath(path) {
  const values = readdirSync(path).map(value => path + '/' + value)
  let children = []
  values.forEach(value => {
    if (lstatSync(value).isDirectory()) {
      removeFromArray(values, value)
      children = [...children, ...parsePath(value)]
    }
  })
  return [...values, ...children]
}

class ProcessImg {
  constructor(path) {
    this.path = path
    this.outputPath = 'images-data.json'
    this.createOutput()
  }

  process() {
    const files = parsePath(this.path)
    
    files.forEach(file => {
      const stats = lstatSync(file)
      const size = Math.round(stats.size / 1024)
      const dimensions = imageSize(file)
      const type = dimensions.type

      if (type === 'svg' && size < 7) return
      
      this.writeToOutput(file, {
        dimensions,
        size: Math.round(stats.size / 1024)
      })
    })
  }

  createOutput() {
    if (existsSync(this.outputPath)) return
    writeFileSync(this.outputPath, '{}')
  }

  writeToOutput(path, data) {
    const outputData = JSON.parse(readFileSync(this.outputPath))
    outputData[path] = data
    writeFileSync(this.outputPath, JSON.stringify(outputData))
  }
}

// Run
(new ProcessImg('static/img')).process()