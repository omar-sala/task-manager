import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/task.routes'
import { errorHandler } from './middlewares/errorHandler'

const app = express()
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://task-manager-frontend-chi-eight.vercel.app',
    ],
  })
)

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is running',
  })
})

app.use('/api/tasks', taskRoutes)
app.use(errorHandler)

export default app
