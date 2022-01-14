import express from "express"
import { stat } from "fs"
import imageSize from "image-size"
import { promisify } from "util"
import { cookParamsInObject, getCookedParamData, getCurrentDomain } from "../../libs/create-url"
const router = express.Router()

router.get(`/media`, async (req, res) => {
  const result = ['bor', 'biba']
  res.json(result)
})

router.get('/media/:paths', async (req, res) => {
  const paths = (function() {
    const paths = getCookedParamData(req.params.paths)
    if (typeof paths === 'object') return paths
    return [paths]
  }())
  const data = await Promise.all(paths.map(async (path) => ({
    src: path,
    dimensions: await promisify(imageSize)('static/' + path.replace(/^\//, '')),
    isHigh: (await promisify(stat)('static/' + path.replace(/^\//, ''))).size >= Number(process.env.MAX_SIZE_TO_HIGH_LOAD)
  })))
  res.json(data)
})

export default router