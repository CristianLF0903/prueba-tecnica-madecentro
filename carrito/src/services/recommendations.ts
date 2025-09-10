import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API || 'http://localhost:3001'

export async function getRecommendations(currentSku: string) {
	const response = await axios.get(
		`${BASE_URL}/products/recommendations/${currentSku}`
	)

	return response.data
}
