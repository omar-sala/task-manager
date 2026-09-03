import { describe, it, expect, afterEach, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '../app'
import prisma from '../lib/prisma'

const createdTaskIds: string[] = []

describe('Task API', () => {
  beforeAll(async () => {
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  afterEach(async () => {
    if (createdTaskIds.length === 0) {
      return
    }

    await prisma.task.deleteMany({
      where: {
        id: {
          in: createdTaskIds,
        },
      },
    })

    createdTaskIds.length = 0
  })

  describe('GET /api/tasks', () => {
    it('should get all tasks', async () => {
      const response = await request(app).get('/api/tasks')

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body).toHaveProperty('data')
      expect(response.body).toHaveProperty('pagination')
    })

    it('should paginate tasks correctly', async () => {
      const firstTask = await request(app).post('/api/tasks').send({
        title: 'Pagination Task 1',
      })

      const secondTask = await request(app).post('/api/tasks').send({
        title: 'Pagination Task 2',
      })

      const thirdTask = await request(app).post('/api/tasks').send({
        title: 'Pagination Task 3',
      })

      createdTaskIds.push(
        firstTask.body.data.id,
        secondTask.body.data.id,
        thirdTask.body.data.id
      )

      const response = await request(app).get('/api/tasks').query({
        page: 1,
        limit: 2,
      })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)

      expect(response.body.pagination.page).toBe(1)
      expect(response.body.pagination.limit).toBe(2)
      expect(response.body.pagination.hasNextPage).toBe(true)

      expect(response.body.data).toHaveLength(2)
    })

    it('should reject invalid pagination values', async () => {
      const response = await request(app).get('/api/tasks').query({
        page: 0,
        limit: 10,
      })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })

    it('should reject limit greater than 100', async () => {
      const response = await request(app).get('/api/tasks').query({
        page: 1,
        limit: 101,
      })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
    })
  })

  describe('GET /api/tasks/:id', () => {
    it('should get a task by id', async () => {
      const createResponse = await request(app).post('/api/tasks').send({
        title: 'Task for get by id',
        description: 'Testing get task by id',
      })

      const taskId = createResponse.body.data.id

      createdTaskIds.push(taskId)

      const response = await request(app).get(`/api/tasks/${taskId}`)

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe(taskId)
      expect(response.body.data.title).toBe('Task for get by id')
    })

    it('should return 404 when task is not found', async () => {
      const response = await request(app).get(
        '/api/tasks/00000000-0000-0000-0000-000000000000'
      )

      expect(response.status).toBe(404)
      expect(response.body.success).toBe(false)
      expect(response.body.message).toBe('Task not found')
    })

    it('should reject an invalid task id', async () => {
      const response = await request(app).get('/api/tasks/invalid-id')

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      expect(response.body).toHaveProperty('errors')
    })
  })

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app).post('/api/tasks').send({
        title: 'Test Task',
        description: 'Created by Supertest',
      })

      createdTaskIds.push(response.body.data.id)

      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('id')
      expect(response.body.data.title).toBe('Test Task')
      expect(response.body.data.completed).toBe(false)
    })

    it('should reject task without title', async () => {
      const response = await request(app).post('/api/tasks').send({
        description: 'Task without title',
      })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      expect(response.body).toHaveProperty('errors')
    })
  })

  describe('PATCH /api/tasks/:id', () => {
    it('should update a task', async () => {
      const createResponse = await request(app).post('/api/tasks').send({
        title: 'Task to update',
      })

      const taskId = createResponse.body.data.id

      createdTaskIds.push(taskId)

      const response = await request(app).patch(`/api/tasks/${taskId}`).send({
        completed: true,
      })

      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.data.id).toBe(taskId)
      expect(response.body.data.completed).toBe(true)
    })

    it('should return 404 when updating a task that does not exist', async () => {
      const response = await request(app)
        .patch('/api/tasks/00000000-0000-0000-0000-000000000000')
        .send({
          completed: true,
        })

      expect(response.status).toBe(404)
      expect(response.body.success).toBe(false)
      expect(response.body.message).toBe('Task not found')
    })

    it('should reject update with empty body', async () => {
      const createResponse = await request(app).post('/api/tasks').send({
        title: 'Task for validation',
      })

      const taskId = createResponse.body.data.id

      createdTaskIds.push(taskId)

      const response = await request(app).patch(`/api/tasks/${taskId}`).send({})

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      expect(response.body).toHaveProperty('errors')
    })

    it('should reject invalid completed value', async () => {
      const createResponse = await request(app).post('/api/tasks').send({
        title: 'Task for invalid completed',
      })

      const taskId = createResponse.body.data.id

      createdTaskIds.push(taskId)

      const response = await request(app).patch(`/api/tasks/${taskId}`).send({
        completed: 'true',
      })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      expect(response.body).toHaveProperty('errors')
    })
  })

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {
      const createResponse = await request(app).post('/api/tasks').send({
        title: 'Task to delete',
      })

      const taskId = createResponse.body.data.id

      const deleteResponse = await request(app).delete(`/api/tasks/${taskId}`)

      expect(deleteResponse.status).toBe(200)
      expect(deleteResponse.body.success).toBe(true)
      expect(deleteResponse.body.message).toBe('Task deleted successfully')

      const getResponse = await request(app).get(`/api/tasks/${taskId}`)

      expect(getResponse.status).toBe(404)
      expect(getResponse.body.message).toBe('Task not found')
    })

    it('should return 404 when deleting a task that does not exist', async () => {
      const response = await request(app).delete(
        '/api/tasks/00000000-0000-0000-0000-000000000000'
      )

      expect(response.status).toBe(404)
      expect(response.body.success).toBe(false)
      expect(response.body.message).toBe('Task not found')
    })
  })
})
