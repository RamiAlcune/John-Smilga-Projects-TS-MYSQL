import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import router from './routes/TaskRoutes'
const app: Application = express()
require('dotenv').config()

//middlwares
app.use(express.json())
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use('/api/v1/tasks', router)

const start = async () => {
  mongoose.connect(process.env.DB_URI as string).then(() => {
    console.log('MongoDB is connected!')
    app.listen(PORT, () => {
      console.log(`Server is listen in port ${PORT} `)
    })
  })
}
start()
