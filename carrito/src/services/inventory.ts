import axios from 'axios'
import { type Inventory, type Product } from '../types'

const BASE_URL = import.meta.env.VITE_API

export async function getInventory(): Promise<Product[]> {
	const response = await axios.get<Inventory[]>(`${BASE_URL}/inventory`)

	return transformInventory(response.data)
}

function transformInventory(
	data: Inventory[],
	pricePerMeter = 1200,
	rollLength = 100
): Product[] {
	const grouped: Record<string, Product> = {}

	data.forEach((item) => {
		const parts = item.sku.split('-')

		let product = ''
		let color = ''

		if (parts.length > 3) {
			product = `${parts[0]}-${parts[1]}`
			color = parts[2]
		} else {
			product = parts[0]
			color = parts[1]
		}

		if (!grouped[product]) {
			grouped[product] = {
				product,
				price_per_meter: pricePerMeter,
				roll_length: rollLength,
				variants: [],
			}
		}

		// Buscar si ya existe variante con ese color + ciudad
		const existing = grouped[product].variants.find(
			(v) => v.color === color && v.city === item.city
		)

		if (existing) {
			existing.available += item.available
		} else {
			grouped[product].variants.push({
				sku: item.sku,
				color,
				city: item.city,
				available: item.available,
			})
		}
	})

	return Object.values(grouped)
}
