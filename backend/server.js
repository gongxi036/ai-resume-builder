import express from 'express'
import dotenv from 'dotenv'

import connectMongoDB from './db/index.js'
import resumeRouter from './routers/resume.route.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/resumes', resumeRouter)

app.listen(PORT, () => {
  console.log(`Server in port: ${PORT}`)
  connectMongoDB()
})



