import { Router } from 'express'
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller'
import { validate } from '../middlewares/validate'
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema'

const router = Router()

router.get('/', getTasks)
router.get('/:id', getTaskById)
router.post('/', validate(createTaskSchema), createTask)
router.patch('/:id', validate(updateTaskSchema), updateTask)
router.delete('/:id', deleteTask)

export default router
