import express from 'express'
import {
  getAllProducts,
  createNewProduct,
} from '../controllers/productsControllers'
const router = express.Router()

router.route('/').get(getAllProducts).post(createNewProduct)
router.route('/:id')

export default router
