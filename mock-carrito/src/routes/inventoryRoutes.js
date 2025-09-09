import { Router } from 'express'
import {
	getInventory,
	getInventoryByCity,
} from '../controllers/inventoryController'

const inventoryRouter = Router()

inventoryRouter.get('/', getInventory)

inventoryRouter.get('/:city', getInventoryByCity)

export default inventoryRouter
