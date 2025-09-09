import { Router } from 'express'
import { addToCart, getCart, getCartItem } from '../controllers/cartController'

const cartRoutes = Router()

cartRoutes.get('/', getCart)

cartRoutes.get('/:id', getCartItem)

cartRoutes.post('/add', addToCart)

export default { cartRoutes }
