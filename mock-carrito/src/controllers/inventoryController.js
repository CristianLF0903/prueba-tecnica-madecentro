import fs from 'fs'
import path from 'path'

const INVENTORY = JSON.parse(
	fs.readFileSync(path.join(process.cwd(), 'src', 'db/inventory.json'), 'utf-8')
)

export async function getInventory(req, res) {
	res.json(INVENTORY)
}

export async function getInventoryByCity(req, res) {
	const city = req.params.city

	console.log(city)

	const data = INVENTORY.filter((value) => value.city === city)

	res.json(data)
}
