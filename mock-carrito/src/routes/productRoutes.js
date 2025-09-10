import { Router } from 'express'
import {
	getProducts,
	getRecommendations,
} from '../controllers/productController.js'

const productRouter = Router()

productRouter.get('/', getProducts)

productRouter.get('/recommendations/:sku', getRecommendations)

export default productRouter
