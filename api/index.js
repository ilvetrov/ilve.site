import express from "express"
const router = express.Router()

const app = express()
app.use(express.json())

import media from "./media"
router.use(media)

app.use(router)

export default {
  path: '/api',
  handler: app
}