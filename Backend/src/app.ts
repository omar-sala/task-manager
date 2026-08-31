import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is running',
  })
})

export default app
