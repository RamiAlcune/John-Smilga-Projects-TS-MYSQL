import express, { Application } from 'express'
import connectDB from './db/connect'
import dotenv from 'dotenv'
import productsRouter from './routes/productsRoutes'
import ErrorHandler from './middleware/errHandling'
import notFound from './middleware/not-found'
dotenv.config()
const app: Application = express()

// Middleware and route setup can go here
app.use(express.json())
app.use('/api/v1/products', productsRouter)
app.use(ErrorHandler)
app.use(notFound)
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
