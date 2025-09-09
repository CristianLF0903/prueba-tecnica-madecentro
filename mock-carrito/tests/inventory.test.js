import test from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { app } from '../src/app.js'

test('GET /inventory debe devolver un array con inventario', async () => {
	const response = await request(app).get('/inventory')
	assert.equal(response.status, 200)
	assert.ok(Array.isArray(response.body), 'La respuesta debe ser un array')
	assert.ok(response.body.length > 0, 'El inventario no debe estar vacío')
})

test('GET /inventory/:city debe devolver inventario filtrado por ciudad', async () => {
	const response = await request(app).get('/inventory/Bogotá')
	assert.equal(response.status, 200)
	assert.ok(Array.isArray(response.body))
	assert.ok(response.body.every((item) => item.city === 'Bogotá'))
})

test('GET /inventory/:city con ciudad inexistente debe devolver array vacío', async () => {
	const response = await request(app).get('/inventory/Cali')
	assert.equal(response.status, 200)
	assert.deepEqual(response.body, [])
})
