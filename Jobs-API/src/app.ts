import express, {
  Application,
  Request,
  Response,
  RequestHandler,
} from 'express'
import connectDB from './db/connect'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import auth from './middleware/authMiddleWare'
import helmet from 'helmet'
import JobsRoutes from './routes/jobsRoutes'
import path from 'path'
dotenv.config()

const app: Application = express()

// Middleware
app.use(express.json())
app.use(helmet())

//Routes
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/Jobs', auth as RequestHandler, JobsRoutes)

app.get('*', (req: Request, res: Response) => {
  console.log('Serving index.html')
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!)
    app.listen(port, () => console.log(`Server is listening on port ${port}`))
  } catch (err) {
    console.log(err)
  }
}

start()
