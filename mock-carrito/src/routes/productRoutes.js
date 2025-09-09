import { Router } from 'express'
import { getProduct } from '../controllers/productController.js'

const productRouter = Router()

productRouter.get('/:sku', getProduct)

export default productRouter
