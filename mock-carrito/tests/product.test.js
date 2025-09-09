import test from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { app } from '../src/app.js'

test('GET /product/:sku debe devolver datos del producto', async () => {
	const sku = 'CANTO-ROBLE-100'
	const response = await request(app).get(`/product/${sku}`)

	assert.equal(response.status, 200)
	assert.equal(response.body.price_per_meter, 1200)
	assert.equal(response.body.roll_length, 100)
	assert.ok(Array.isArray(response.body.inventory), 'Debe incluir inventario')
	assert.ok(response.body.inventory.every((item) => item.sku === sku))
})

test('GET /product sin sku debe dar error 400', async () => {
	const response = await request(app).get('/product/')
	assert.equal(response.status, 404) // Express devuelve 404 si falta el param
})

test('GET /product/:sku inexistente debe devolver inventario vacío', async () => {
	const response = await request(app).get('/product/INVALID-SKU')
	assert.equal(response.status, 200)
	assert.deepEqual(response.body.inventory, [])
})
