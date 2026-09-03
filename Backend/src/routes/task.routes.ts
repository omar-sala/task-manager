import { Router } from 'express'
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller'
import { validate } from '../middlewares/validate'
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} from '../schemas/task.schema'

const router = Router()

router.get('/', getTasks)
router.get('/:id', validate(taskIdSchema, 'params'), getTaskById)
router.post('/', validate(createTaskSchema), createTask)
router.patch(
  '/:id',
  validate(taskIdSchema, 'params'),
  validate(updateTaskSchema),
  updateTask
)
router.delete('/:id', validate(taskIdSchema, 'params'), deleteTask)

export default router
