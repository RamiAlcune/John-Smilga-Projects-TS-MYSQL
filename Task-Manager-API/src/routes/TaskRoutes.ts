import { Router } from 'express'
import {
  createTask,
  getAllTasks,
  deleteTask,
  getTaskByID,
  updateTask,
} from '../controllers/TaskController'

const router: Router = Router()

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTaskByID).delete(deleteTask).patch(updateTask)

export default router
