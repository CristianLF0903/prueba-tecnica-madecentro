import fs from 'fs'
import path from 'path'

const META_FIELDS = JSON.parse(
	fs.readFileSync(
		path.join(process.cwd(), 'src', 'db/metafields.json'),
		'utf-8'
	)
)

const INVENTORY = JSON.parse(
	fs.readFileSync(path.join(process.cwd(), 'src', 'db/inventory.json'), 'utf-8')
)

export async function getProduct(req, res) {
	try {
		const sku = req.params.sku

		if (!sku) {
			res.status(400).json({ error: 'El sku es requerido' })
		}

		const { price_per_meter, roll_length } = META_FIELDS.custom

		const inventory = INVENTORY.filter((value) => value.sku === sku)

		const productData = {
			sku: inventory.sku || 'N/A',
			price_per_meter,
			roll_length,
			inventory, // lista de ciudades con disponibilidad
		}

		res.json(productData)
	} catch (error) {
		res.status(500).json({ error: 'Error cargando producto' })
	}
}
