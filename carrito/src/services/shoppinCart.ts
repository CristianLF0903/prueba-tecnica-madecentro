import axios from 'axios'
import type { ProductPayload } from '../types'

const BASE_URL = import.meta.env.VITE_API || 'http://localhost:3001'

export async function addCart(payload: ProductPayload) {
	const response = await axios.post(`${BASE_URL}/cart/add`, payload)
	return response.data
}
