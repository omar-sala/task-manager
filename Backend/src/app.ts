import express from 'express'
import taskRoutes from './routes/task.routes'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is running',
  })
})

app.use('/api/tasks', taskRoutes)

export default app
