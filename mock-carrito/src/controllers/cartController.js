import { error } from 'console'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const cartFile = path.join(__dirname, '../db/cart.json')

const readCart = () => {
	if (!fs.existsSync(cartFile)) {
		return []
	}
	const data = fs.readFileSync(cartFile, 'utf8')
	return data ? JSON.parse(data) : []
}

const saveCart = (cart) => {
	fs.writeFileSync(cartFile, JSON.stringify(cart, null, 2))
}

export async function getCart(req, res) {
	try {
		const cart = readCart()
		res.json(cart)
	} catch (_) {
		res.status(500).json({ error: 'Error cargando el carrito' })
	}
}

export async function getCartItem(req, res) {
	try {
		const id = req.params.id
		const cart = readCart()

		if (!id) {
			res.status(400).json({ error: 'El id es requerido' })
		}

		const itemCart = cart.find((item) => item.line_item_id === id)

		if (!itemCart) {
			res.status(400).json({
				error: `No se encontró el objecto con el id: ${id} en el carrito`,
			})
		}

		res.json(itemCart)
	} catch (_) {
		res.status(500).json({ error: 'Error cargando el carrito' })
	}
}

export const addToCart = (req, res) => {
	const { sku, quantity, properties } = req.body

	// 🔎 Validación del payload
	if (!sku || !quantity || !properties) {
		return res
			.status(400)
			.json({ error: 'sku, quantity y properties son requeridos' })
	}
	const { desired_meters, city, color } = properties
	if (!desired_meters || !city || !color) {
		return res
			.status(400)
			.json({ error: 'properties debe incluir desired_meters, city y color' })
	}

	try {
		const cart = readCart()

		// Generar ID único para el item
		const line_item_id = uuidv4()

		const newItem = {
			line_item_id,
			sku,
			quantity,
			properties,
		}

		cart.push(newItem)

		saveCart(cart)

		res.json({ ok: true, line_item_id })
	} catch (error) {
		res.status(500).json({ error: 'Error al guardar en el carrito' })
	}
}
