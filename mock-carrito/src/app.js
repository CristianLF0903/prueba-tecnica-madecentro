import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import middleware from './utils/middleware.js'

import inventoryRouter from './routes/inventoryRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'

export const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('public'))
app.use(express.json())

app.use('/inventory', inventoryRouter)
app.use('/product', productRouter)
app.use('/cart', cartRoutes)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
