import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

import connectMongoDB from './db/index.js'
import resumeRouter from './routers/resume.route.js'

dotenv.config()
const app = express()
const __dirname = path.resolve()

const PORT = process.env.PORT

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/resumes', resumeRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server in port: ${PORT}`)
  connectMongoDB()
})



