import express, { RequestHandler } from 'express'
import { Register, Login, updateUser } from '../controllers/auth'
import auth from '../middleware/authMiddleWare'
const router = express.Router()

router.post('/register', Register)
router.post('/login', Login)
router.patch('/updateUser', auth as RequestHandler, updateUser)

export default router
