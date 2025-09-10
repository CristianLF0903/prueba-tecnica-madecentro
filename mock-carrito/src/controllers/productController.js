import fs from 'fs'
import path from 'path'

const PRODUCTS = JSON.parse(
	fs.readFileSync(path.join(process.cwd(), 'src', 'db/products.json'), 'utf-8')
)

export async function getProducts(req, res) {
	try {
		res.json(PRODUCTS)
	} catch (error) {
		res.status(500).json({ error: 'Error cargando los productos' })
	}
}

export async function getRecommendations(req, res) {
	try {
		const sku = req.params.sku

		res.json(recommendations(sku))
	} catch (error) {
		res.status(500).json({ error: 'Error cargando los productos' })
	}
}

function recommendations(currentSku, max = 3) {
	console.log('aqui')

	const currentProduct = PRODUCTS.find((p) => p.sku === currentSku)
	if (!currentProduct) return []

	const currentTags = currentProduct.tags

	const recommendations = PRODUCTS.filter((p) => p.sku !== currentSku)
		.map((p) => {
			const common = p.tags.filter((tag) => currentTags.includes(tag))
			const score = common.length / currentTags.length
			return { ...p, score }
		})
		.sort((a, b) => b.score - a.score)
		.slice(0, max)

	return recommendations
}
