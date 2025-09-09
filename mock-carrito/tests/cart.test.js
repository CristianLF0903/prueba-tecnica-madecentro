import test from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { app } from '../src/app.js'

test('GET /cart debe devolver un array', async (t) => {
	const response = await request(app).get('/cart')
	assert.equal(response.status, 200)
	assert.ok(Array.isArray(response.body), 'La respuesta debe ser un array')
})

test('POST /cart/add debe agregar un item válido', async (t) => {
	const newItem = {
		sku: 'CANTO-ROBLE-100',
		quantity: 2,
		properties: {
			desired_meters: 250,
			city: 'Bogotá',
			color: 'roble',
		},
	}

	const response = await request(app).post('/cart/add').send(newItem)

	assert.equal(response.status, 200)
	assert.equal(response.body.ok, true)
	assert.ok(response.body.line_item_id, 'Debe devolver un line_item_id')
})

test('POST /cart/add debe fallar si faltan campos', async (t) => {
	const badItem = { sku: 'CANTO-ROBLE-100' }

	const response = await request(app).post('/cart/add').send(badItem)

	assert.equal(response.status, 400)
	assert.ok(response.body.error)
})

test('GET /cart/:id debe devolver el item agregado', async (t) => {
	// Primero agregar un item
	const newItem = {
		sku: 'CANTO-ROBLE-100',
		quantity: 1,
		properties: {
			desired_meters: 100,
			city: 'Bogotá',
			color: 'roble',
		},
	}
	const addResponse = await request(app).post('/cart/add').send(newItem)
	const id = addResponse.body.line_item_id

	// Luego obtenerlo por id
	const response = await request(app).get(`/cart/${id}`)

	assert.equal(response.status, 200)
	assert.equal(response.body.line_item_id, id)
})
